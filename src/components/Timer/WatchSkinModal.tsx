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
        styles={{ body: { padding: 0, background: "none", border: "none" } }}
      >
        <div className="p-8 ">
          <h2 className="text-2xl font-bold text-center text-purple-600 mb-8">
            Choose Watch Style
          </h2>
          {/* Container for Carousel and arrow buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ minHeight: "400px" }}
          >
            <button
              onClick={() => carouselRef.current?.prev()}
              className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <LeftOutlined className="text-xl" />
            </button>
            <div className="w-full max-w-[350px]" style={{ height: "400px" }}>
              <Carousel
                ref={carouselRef}
                dots={false}
                swipeToSlide
                draggable
                speed={500}
                afterChange={(current) => setTempSkin(skins[current].id)}
              >
                {skins.map(({ id }) => (
                  <div
                    key={id}
                    className="w-full h-full flex items-center justify-center"
                  >
                    {renderWatchForSkin(id)}
                  </div>
                ))}
              </Carousel>
            </div>
            <button
              onClick={() => carouselRef.current?.next()}
              className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <RightOutlined className="text-xl" />
            </button>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {skins.map(({ id, label }, index) => (
              <button
                key={id}
                onClick={() => {
                  carouselRef.current?.goTo(index);
                  setTempSkin(id);
                }}
                className={`px-4 py-2 rounded-lg transition-all ${
                  tempSkin === id
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg shadow-md transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md transition-all"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
