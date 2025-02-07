import { useEffect, useState } from "react";
import { Modal } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import WatchDigital from "../Watch/WatchDigital";
import WatchAnalogic from "../Watch/WatchAnalogic";
import WatchAnalogicClassic from "../Watch/WatchAnalogicClassic";
import WatchAnalogicSimple from "../Watch/WatchAnalogicSimple";
import WatchFit from "../Watch/WatchFit";
import WatchFitSlim from "../Watch/WatchFitSlim";
import WatchSimple from "../Watch/WatchSimple";
import { WatchSkin } from "../../types";

interface WatchSkinModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSkin: WatchSkin;
  onSkinChange: (skin: WatchSkin) => void;
  time: { minutes: string; seconds: string };
  initialSeconds: number;
  totalSeconds: number;
}

export default function WatchSkinModal({
  isOpen,
  onClose,
  currentSkin,
  onSkinChange,
  time,
  initialSeconds,
  totalSeconds,
}: WatchSkinModalProps) {
  const skins: Array<{ id: WatchSkin; label: string }> = [
    { id: "digital", label: "Digital" },
    { id: "analogic", label: "Analogic" },
    { id: "analogicClassic", label: "Classic" },
    { id: "analogicSimple", label: "Simple Analogic" },
    { id: "fit", label: "Fit" },
    { id: "fitSlim", label: "Fit Slim" },
    { id: "simple", label: "Simple" },
  ];

  const [modalWidth, setModalWidth] = useState(800);
  useEffect(() => {
    const handleResize = () => {
      setModalWidth(window.innerWidth < 640 ? window.innerWidth * 0.95 : 800);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrevSkin = () => {
    const currentIndex = skins.findIndex((s) => s.id === currentSkin);
    const prevIndex = (currentIndex - 1 + skins.length) % skins.length;
    onSkinChange(skins[prevIndex].id);
  };

  const handleNextSkin = () => {
    const currentIndex = skins.findIndex((s) => s.id === currentSkin);
    const nextIndex = (currentIndex + 1) % skins.length;
    onSkinChange(skins[nextIndex].id);
  };

  const renderWatch = () => {
    const props = {
      minutes: time.minutes,
      seconds: time.seconds,
      initialSeconds,
      totalSeconds,
    };

    switch (currentSkin) {
      case "digital":
        return <WatchDigital {...props} />;
      case "analogic":
        return <WatchAnalogic {...props} />;
      case "analogicClassic":
        return <WatchAnalogicClassic {...props} />;
      case "analogicSimple":
        return <WatchAnalogicSimple {...props} />;
      case "fit":
        return <WatchFit {...props} />;
      case "fitSlim":
        return <WatchFitSlim {...props} />;
      case "simple":
        return <WatchSimple {...props} />;
      default:
        return <WatchDigital {...props} />;
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={modalWidth}
      centered
      className="watch-skin-modal"
    >
      <div className="p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
          Choose Watch Style
        </h2>
        {/* Use a column layout on mobile and a row layout on larger screens */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 min-h-[400px]">
          <button
            onClick={handlePrevSkin}
            className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <LeftOutlined className="text-xl" />
          </button>
          {/* Watch container forces an aspect-square and prevents overflow */}
          <div className="relative flex items-center justify-center w-full max-w-[300px] min-h-[400px] aspect-square">
            {renderWatch()}
          </div>
          <button
            onClick={handleNextSkin}
            className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <RightOutlined className="text-xl" />
          </button>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {skins.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => onSkinChange(id)}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentSkin === id
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
