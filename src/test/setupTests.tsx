import "@testing-library/jest-dom";
import { act } from "@testing-library/react";

// Mock requestAnimationFrame globally
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);

// Mock getComputedStyle with proper return type and implementation
Object.defineProperty(window, "getComputedStyle", {
  value: () => ({
    getPropertyValue: () => {
      return "";
    },
    getPropertyPriority: () => "",
    setProperty: () => "",
    removeProperty: () => "",
    transitionDuration: "0s",
    transitionDelay: "0s",
  }),
});

// Mock antd's Modal and CSSMotion components
jest.mock("antd", () => ({
  Modal: ({
    children,
    open,
    onCancel,
  }: {
    children: React.ReactNode;
    open: boolean;
    onCancel: () => void;
  }) =>
    open ? (
      <div role="dialog" aria-modal="true">
        {children}
        <button onClick={onCancel}>Close</button>
      </div>
    ) : null,
  Carousel: ({
    children,
    afterChange,
  }: {
    children: React.ReactNode[];
    afterChange?: (current: number) => void;
  }) => (
    <div data-testid="carousel">
      {children}
      <button onClick={() => afterChange?.(1)}>Next</button>
    </div>
  ),
}));

// Mock rc-motion
jest.mock("rc-motion", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock CSS transitions
const originalAddEventListener = window.addEventListener;
window.addEventListener = (
  event: string,
  callback: EventListenerOrEventListenerObject
) => {
  if (event === "transitionend") return;
  return originalAddEventListener(event, callback);
};

// Setup global mocks
beforeAll(() => {
  // Mock window.scrollTo
  Object.defineProperty(window, "scrollTo", {
    value: jest.fn(),
    writable: true,
  });
});

beforeEach(() => {
  // Clear all mocks and timers
  jest.clearAllMocks();
  jest.useRealTimers();
});

// Helper to wait for all updates including CSSMotion
export const waitForUpdates = async () => {
  await act(async () => {
    // Wait for multiple ticks to ensure all updates are processed
    await Promise.resolve();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await Promise.resolve();
  });
};

// Helper to wait for animations
export const waitForAnimations = async () => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    jest.runOnlyPendingTimers();
    await Promise.resolve();
  });
};
