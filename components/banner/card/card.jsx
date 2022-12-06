import React from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./card.module.css";

const Card = (props) => {
  return (
    <div>
      <Link href={props.href} className={style.cardLink}>
        <div className={`glass ${style.container}`}>
          <div className={style.cardHeaderWrapper}>
            <h2 className={style.cardHeader}>{props.name}</h2>
          </div>
          <div className={style.cardImageWrapper}>
            <Image
              className={style.cardImage}
              src={props.src}
              height="160"
              width="100"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
