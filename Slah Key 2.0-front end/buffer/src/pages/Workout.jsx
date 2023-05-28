import React, { useState } from 'react';
import Modal from 'react-modal';
import Webcam from 'react-webcam';
import Header from "../components/Header";
Modal.setAppElement('#root');

function Workout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className=''>
      <Header />
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 ml-4 mr-4 ">
        <div>
          <div
            className="bg-red-100 shadow-lg rounded-lg overflow-hidden hover:shadow-xl hover:cursor-pointer hover:bg-red-200 transition duration-300"
            onClick={handleOpenModal}
          >
            <img className="w-full" src="/images/profile-picture.jpg" alt="Card" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">ww</h2>
              <p className="text-gray-700">w</p>
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Camera Modal"
          >
            <button onClick={handleCloseModal}>Close Modal</button>
            <div>
              {/* Render the camera stream within the modal using react-webcam */}
              <Webcam audio={false} />
            </div>
          </Modal>
        </div>
        <div>
          <div
            className="bg-red-100 shadow-lg rounded-lg overflow-hidden hover:shadow-xl hover:cursor-pointer hover:bg-red-200 transition duration-300"
            onClick={handleOpenModal}
          >
            <img className="w-full" src="/images/profile-picture.jpg" alt="Card" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">ww</h2>
              <p className="text-gray-700">w</p>
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Camera Modal"
          >
            <button onClick={handleCloseModal}>Close Modal</button>
            <div>
              {/* Render the camera stream within the modal using react-webcam */}
              <Webcam audio={false} />
            </div>
          </Modal>
        </div>
        <div>
          <div
            className="bg-red-100 shadow-lg rounded-lg overflow-hidden hover:shadow-xl hover:cursor-pointer hover:bg-red-200 transition duration-300"
            onClick={handleOpenModal}
          >
            <img className="w-full" src="/images/profile-picture.jpg" alt="Card" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">ww</h2>
              <p className="text-gray-700">w</p>
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Camera Modal"
          >
            <button onClick={handleCloseModal}>Close Modal</button>
            <div>
              {/* Render the camera stream within the modal using react-webcam */}
              <Webcam audio={false} />
            </div>
          </Modal>
        </div>
        <div>
          <div
            className="bg-red-100 shadow-lg rounded-lg overflow-hidden hover:shadow-xl hover:cursor-pointer hover:bg-red-200 transition duration-300"
            onClick={handleOpenModal}
          >
            <img className="w-full" src="/images/profile-picture.jpg" alt="Card" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">ww</h2>
              <p className="text-gray-700">w</p>
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Camera Modal"
          >
            <button onClick={handleCloseModal}>Close Modal</button>
            <div>
              {/* Render the camera stream within the modal using react-webcam */}
              <Webcam audio={false} />
            </div>
          </Modal>
        </div>
      </div>
    </div>

  );
}

export default Workout;
