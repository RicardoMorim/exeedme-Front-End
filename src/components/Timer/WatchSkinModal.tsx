import { useEffect, useRef, useState, useMemo } from "react";
import { Modal, Carousel } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import WatchDigital from "../Watch/WatchDigital";
import WatchAnalogic from "../Watch/WatchAnalogic";
import WatchAnalogicClassic from "../Watch/WatchAnalogicClassic";
import WatchAnalogicSimple from "../Watch/WatchAnalogicSimple";
import WatchFit from "../Watch/WatchFit";
import WatchFitSlim from "../Watch/WatchFitSlim";
import WatchSimple from "../Watch/WatchSimple";
import { WatchSkin } from "../../types";
import SimpleStopwatch from "../Watch/SimpleStopWatch";

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
  const skins = useMemo<Array<{ id: WatchSkin; label: string }>>(
    () => [
      { id: "digital", label: "Digital" },
      { id: "analogic", label: "Analogic" },
      { id: "analogicClassic", label: "Classic" },
      { id: "analogicSimple", label: "Simple Analogic" },
      { id: "fit", label: "Fit" },
      { id: "fitSlim", label: "Fit Slim" },
      { id: "simple", label: "Simple" },
      { id: "SimpleStopWatch", label: "StopWatch" },
    ],
    []
  );

  const [modalWidth, setModalWidth] = useState(800);

  // modal size based on width
  useEffect(() => {
    const handleResize = () => {
      setModalWidth(window.innerWidth < 640 ? window.innerWidth * 0.95 : 800);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [tempSkin, setTempSkin] = useState<WatchSkin>(currentSkin);
  const carouselRef = useRef<CarouselRef>(null);
  useEffect(() => {
    if (isOpen) {
      setTempSkin(currentSkin);
      const index = skins.findIndex((s) => s.id === currentSkin);
      carouselRef.current?.goTo(index, false);
    }
  }, [isOpen, currentSkin, skins]);

  const renderWatchForSkin = (skin: WatchSkin) => {
    const props = {
      minutes: time.minutes,
      seconds: time.seconds,
      initialSeconds,
      totalSeconds,
    };
    switch (skin) {
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
      case "SimpleStopWatch":
        return (
          <SimpleStopwatch
            {...{
              ...props,
              minutes: parseInt(time.minutes),
              seconds: parseInt(time.seconds),
            }}
          />
        );
      default:
        return <WatchDigital {...props} />;
    }
  };

  const handleSave = () => {
    onSkinChange(tempSkin);
    onClose();
  };

  // do not allow scroll when the modal is openned
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // Restore scrolling
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      // Cleanup
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isOpen]);

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width={modalWidth}
        centered
        className="watch-skin-modal"
        mask={false}
        keyboard={true}
        styles={{
          body: {
            padding: 0,
            background: "none",
            border: "none",
            minHeight: "60vh",
          },
        }}
      >
        <div className="p-4 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-purple-600 mb-4 sm:mb-8">
            Choose Watch Style
          </h2>

          {/* Carousel Container */}
          <div className="relative w-full flex items-center justify-center mb-8">
            <button
              onClick={() => carouselRef.current?.prev()}
              className="absolute left-0 z-10 p-2 sm:p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <LeftOutlined className="text-lg sm:text-xl" />
            </button>

            <div className="w-[280px] sm:w-[350px] h-[200px] sm:h-[400px] mx-auto">
              <Carousel
                ref={carouselRef}
                dots={false}
                swipeToSlide
                draggable
                speed={500}
                afterChange={(current) => setTempSkin(skins[current].id)}
                className="h-full"
              >
                {skins.map(({ id }) => (
                  <div
                    key={id}
                    className="!flex items-center justify-center h-full"
                  >
                    <div className="transform scale-[0.6] sm:scale-100">
                      {renderWatchForSkin(id)}
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>

            <button
              onClick={() => carouselRef.current?.next()}
              className="absolute right-0 z-10 p-2 sm:p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <RightOutlined className="text-lg sm:text-xl" />
            </button>
          </div>

          <div className="mt-6 sm:mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
            {skins.map(({ id, label }, index) => (
              <button
                key={id}
                onClick={() => {
                  carouselRef.current?.goTo(index);
                  setTempSkin(id);
                }}
                className={`text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 rounded-lg transition-all ${
                  tempSkin === id
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg shadow-md transition-all text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md transition-all text-sm sm:text-base"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
