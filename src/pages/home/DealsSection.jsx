import CountdownTimer from "../../components/CountdownTimer";
import dealsImg from '../../assets/deals.png'

const DealsSection = () => {
  const countdownEndDate = "2024-11-31T23:59:59"; // Replace with your target date/time
  return (
    <section className="section__container deals__container">
      <div className="deals__image">
        <img src={dealsImg} alt="Deals Image" />
      </div>
      <div className="deals__content">
        <h5 className="capitalize">Get up to 20% Discount</h5>
        <h4 className="capitalize">Deals of the Month</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos,
          repudiandae quasi sapiente dolores eaque, odio omnis aliquid aliquam
          veritatis sed amet quas tenetur odit officiis voluptates atque
          voluptate sunt incidunt?
        </p>
        <div className="deals__countdown flex-wrap">
          
            <CountdownTimer endDate={countdownEndDate} />
        </div>
      </div>
    </section>
  );
}

export default DealsSection
