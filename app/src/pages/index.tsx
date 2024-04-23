import React from "react";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Homepage</h1>
      <Link href="/center-a-div">Exercise One: Center a Div</Link>
      <br />
      <Link href="/table">Exercise Two: Table</Link>
      <br />
      <Link href="/javascript">Exercise Three: JavaScript</Link>
    </div>
  );
};

export default HomePage;
