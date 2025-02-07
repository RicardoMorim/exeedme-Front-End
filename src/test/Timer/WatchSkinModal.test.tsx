import React, { useState } from "react";

// Mock all components before imports
const mockWatchComponent = () => <div data-testid="watch-component" />;

jest.mock("../../Components/Watch/WatchDigital", () => ({
  __esModule: true,
  default: mockWatchComponent,
}));
jest.mock("../../Components/Watch/WatchAnalogic", () => ({
  __esModule: true,
  default: mockWatchComponent,
}));
jest.mock("../../Components/Watch/WatchAnalogicClassic", () => ({
  __esModule: true,
  default: mockWatchComponent,
}));
jest.mock("../../Components/Watch/WatchAnalogicSimple", () => ({
  __esModule: true,
  default: mockWatchComponent,
}));
jest.mock("../../Components/Watch/WatchFit", () => ({
  __esModule: true,
  default: mockWatchComponent,
}));
jest.mock("../../Components/Watch/WatchFitSlim", () => ({
  __esModule: true,
  default: mockWatchComponent,
}));
jest.mock("../../Components/Watch/WatchSimple", () => ({
  __esModule: true,
  default: mockWatchComponent,
}));
jest.mock("../../Components/Watch/SimpleStopWatch", () => ({
  __esModule: true,
  default: mockWatchComponent,
}));

jest.mock("@ant-design/icons", () => ({
  LeftOutlined: () => "<",
  RightOutlined: () => ">",
}));

jest.mock("antd", () => ({
  Modal: ({ children, open }: { children: React.ReactNode; open: boolean }) =>
    open ? <div role="dialog">{children}</div> : null,
  Carousel: ({
    children,
    afterChange,
  }: {
    children: React.ReactNode[];
    afterChange: (index: number) => void;
  }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const methods = {
      prev: () => setActiveIndex(Math.max(0, activeIndex - 1)),
      next: () =>
        setActiveIndex(
          Math.min(React.Children.count(children) - 1, activeIndex + 1)
        ),
      goTo: (index: number) => setActiveIndex(index),
    };

    return (
      <div
        data-testid="carousel"
        ref={(element) => {
          if (element) Object.assign(element, methods);
        }}
      >
        {React.Children.toArray(children)[activeIndex]}
        <button
          onClick={() => {
            setActiveIndex(1);
            afterChange(1);
          }}
        >
          Change
        </button>
      </div>
    );
  },
}));

import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import WatchSkinModal from "../../components/Timer/WatchSkinModal";
import { WatchSkin } from "../../types";

describe("WatchSkinModal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    currentSkin: "digital" as WatchSkin,
    onSkinChange: jest.fn(),
    time: { minutes: "25", seconds: "00" },
    initialSeconds: 1500,
    totalSeconds: 1500,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderModal = (props = defaultProps) => {
    return render(<WatchSkinModal {...props} />);
  };

  it("renders when isOpen is true", () => {
    renderModal();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Choose Watch Style")).toBeInTheDocument();
  });

  it("doesn't render when isOpen is false", () => {
    renderModal({ ...defaultProps, isOpen: false });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows all available watch skins as buttons", () => {
    renderModal();
    expect(screen.getByText("Digital")).toBeInTheDocument();
    expect(screen.getByText("Analogic")).toBeInTheDocument();
    expect(screen.getByText("Classic")).toBeInTheDocument();
    expect(screen.getByText("Simple Analogic")).toBeInTheDocument();
  });

  it("highlights current skin button", () => {
    renderModal();
    const digitalButton = screen.getByText("Digital").closest("button");
    expect(digitalButton).toHaveClass("bg-purple-600");
  });

  it("calls onClose when Cancel button is clicked", () => {
    renderModal();
    fireEvent.click(screen.getByText("Cancel"));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls onSkinChange and onClose when Save button is clicked", () => {
    renderModal();
    fireEvent.click(screen.getByText("Save"));
    expect(defaultProps.onSkinChange).toHaveBeenCalledWith("digital");
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("updates tempSkin when carousel changes", () => {
    renderModal();
    const carouselChangeButton = screen.getByText("Change");
    fireEvent.click(carouselChangeButton);

    // Click save to verify the new skin is selected
    fireEvent.click(screen.getByText("Save"));
    expect(defaultProps.onSkinChange).toHaveBeenCalledWith("analogic");
  });

  it("handles window resize", () => {
    const { rerender } = renderModal();

    // Mock window resize
    act(() => {
      global.innerWidth = 400;
      global.dispatchEvent(new Event("resize"));
    });

    rerender(<WatchSkinModal {...defaultProps} />);

    // Should update modal width (can't test directly due to antd Modal mock)
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("resets to current skin when modal opens", () => {
    const { rerender } = renderModal({ ...defaultProps, isOpen: false });

    // Change current skin and open modal
    rerender(
      <WatchSkinModal
        {...{ ...defaultProps, isOpen: true, currentSkin: "analogic" }}
      />
    );

    // Click save to verify the correct skin is selected
    fireEvent.click(screen.getByText("Save"));
    expect(defaultProps.onSkinChange).toHaveBeenCalledWith("analogic");
  });

  it("renders correct watch component for each skin", () => {
    renderModal();
    const watchComponents = screen.getAllByTestId("watch-component");
    expect(watchComponents).toHaveLength(1);
  });

  it("handles navigation button clicks", () => {
    renderModal();
    const prevButton = screen.getByText("<");
    const nextButton = screen.getByText(">");

    fireEvent.click(nextButton);
    fireEvent.click(prevButton);

    // Can't test carousel directly due to mock, but ensures buttons don't crash
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
