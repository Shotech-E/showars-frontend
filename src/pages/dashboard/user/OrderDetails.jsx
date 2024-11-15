// import { useSelector } from "react-redux"
import { useGetOrderByIdQuery } from "../../../redux/features/order/orderApi";
import { useParams } from "react-router-dom";
import TimelineStep from "../../../components/TimelineStep";

const OrderDetails = () => {
    // const { user } = useSelector((state) => state.auth);
    const { orderId } = useParams();
    const { data: order, error, isLoading } = useGetOrderByIdQuery(orderId);

    if (isLoading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">No data found</div>;

    const isCompleted = (status) => {
      const statuses = [ "pending", "processing", "shipped", "completed" ];
      return statuses.indexOf(status) < statuses.indexOf(order.status);
    };

    const isCurrent = (status) => order.status === status;
    const steps = [
      {
        status: "pending",
        label: "Pending",
        description: "Your order has been created and is awaiting processing.",
        icon: {
          iconName: "time-line",
          bgColor: "red-500",
          textColor: "gray-800",
        },
      },
      {
        status: "processing",
        label: "Processing",
        description: "Your order is currently being processed.",
        icon: {
          iconName: "loader-line",
          bgColor: "yellow-800",
          textColor: "yellow-800",
        },
      },
      {
        status: "shipped",
        label: "Shipped",
        description: "Your order has been shipped.",
        icon: {
          iconName: "truck-line",
          bgColor: "blue-800",
          textColor: "blue-800",
        },
      },
      {
        step: "completed",
        label: "Completed",
        description: "Your order has been successfully completed.",
        icon: {
          iconName: "check-line",
          bgColor: "green-800",
          textColor: "green-900",
        },
      },
    ];

  return (
    <section className="section__container rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment {order?.status}</h2>
      <p className="mb-4">Order ID: {order?.orderId}</p>
      <p className="mb-8">Status: {order?.status}</p>

      <ol className=" sm:flex items-center relative">
        {steps.map((step, index) => (
          <TimelineStep
            key={index}
            step={step}
            order={order}
            isCompleted={isCompleted(step.status)}
            isCurrent={isCurrent(step.status)}
            isLastStep={index === steps.length - 1}
            icon={step.icon}
            description={step.description}
          />
        ))}
      </ol>
    </section>
  );
}

export default OrderDetails
