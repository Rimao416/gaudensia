import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";
import { useGetOrdersQuery } from "../slice/orderSlice";
import OrderComponent from "../components/Order";
import { useState } from "react";
import Modal from "../components/Modal";

import { order } from "../interface/order";
import OrderDetails from "../components/OrderDetails";

function Order() {
  const { data: orders } = useGetOrdersQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<order | null>(null);
  const handleOpenModal = (myOrder: order) => {
    setSelectedOrder(myOrder);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };
  const { t } = useTranslation();
  return (
    <>
      <div className="parent">
        <Navbar />
        <div className="myOrder">
          <div className="myOrder__up">
            <div className="myOrder__up--text">
              <h1>{t("menuInfo")}</h1>
              <p>{t("menuDescription")}</p>
              <p></p>
            </div>
            <div className="custom-shape-divider-bottom-1732082832">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                  className="shape-fill"
                ></path>
              </svg>
            </div>
          </div>

          <div className="myOrder__body">
            {orders?.map((order) => (
              <div className="myOrder__box" key={order._id}  onClick={() => handleOpenModal(order)}>
                <OrderComponent {...order} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedOrder && (
         <OrderDetails order={selectedOrder}/>
        )}
      </Modal>
    </>
  );
}

export default Order;
