import Header from "../components/Header.tsx";
import Banner from "../components/Banner.tsx";
import Card from "../components/Card.tsx";
import { ReactElement } from "react";
import fakeitemdb from "../fakeitemdb.json";

export type fakeItemDB = typeof fakeitemdb;

function Home(): ReactElement {
  return (
    <>
      <Header />
      <Banner />
      <div className="mx-auto mt-4 h-screen min-w-max max-w-5xl">
        <div className="flex h-36 w-full items-center justify-center border-b-2 border-gray-100 py-4 text-4xl font-bold">
          <span>방금 올라왔어요</span>
        </div>
        <div className="mx-auto my-8 grid max-w-4xl grid-cols-3 gap-8">
          {fakeitemdb.map((item) => {
            return <Card item={item} key={item.itemid} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
