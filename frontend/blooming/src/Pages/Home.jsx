import WeddingDday from "../components/Home/WeddingDday";
// import ScheduleDday from "../components/Home/ScheduleDday";
// import MainImage from "../components/Home/MainImage";
import PlanTips from "../components/Home/PlanTips";

function Home() {
  return (
    <div className='mainContainer'>
      <WeddingDday />

      {/* PlanTips랑 합침 */}
      {/* <MainImage /> */}

      <PlanTips />

      {/* <ScheduleDday /> */}

      {/* 예약, 좋아요 */}
      <button>나와라모듈</button>
    </div>
  );
}

export default Home;
