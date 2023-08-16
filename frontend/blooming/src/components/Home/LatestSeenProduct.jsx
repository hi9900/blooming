import { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import ProductItem from "../Info/ProductItem";
import classes from "./WeddingFair.module.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";

export default function LatestSeenProduct() {
  const navigate = useNavigate();

  const [latest, setLatest] = useState([]);

  const fetchData = async () => {
    try {
      const response = await customAxios.get("latestSeenProduct");
      if (response.status === 200) {
        setLatest(response.data.result[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigation = (productType, id) => {
    navigate(`/${productType}/${id}`, {
      state: { id, productType, navAction: "info" },
    });
  };

  const handleCreateWish = async (id) => {
    try {
      await customAxios.post(`wishlist/${id}`);
      const updatedLatest = latest.map((item) => {
        if (item.productId === id) {
          return { ...item, wish: true };
        }
        return item;
      });
      setLatest(updatedLatest);
    } catch (error) {
      console.error("찜하기 에러:", error);
    }
  };
  const handleDeleteWish = async (id) => {
    try {
      await customAxios.delete(`wishlist/${id}`);
      const updatedLatest = latest.map((item) => {
        if (item.productId === id) {
          return { ...item, wish: false };
        }
        return item;
      });
      setLatest(updatedLatest);
    } catch (error) {
      console.error("찜취소 에러:", error);
    }
  };
  const onWish = (id, wishStatus) => {
    // 찜
    if (wishStatus) {
      // true이면 DELETE
      handleDeleteWish(id);
    } else {
      // false이면 POST
      handleCreateWish(id);
    }
  };

  return (
    <div className={`${classes.container}`}>
      {latest.length > 0 ? (
        latest.map((item, index) => (
          <div key={index}>
            <div className={`${classes.LastWrapper}`}>
              <div
                className={classes.lastItemContainer}
                onClick={() =>
                  handleNavigation(item.productType, item.productId)
                }
              >
                <img
                  className={`${classes.listItemImg} `}
                  src={item.thumbnail}
                  alt='이미지 없음'
                />
                <div className={`${classes.cardtext} ${classes.LastCompany}`}>
                  <div className={`${classes.cardtitle} ${classes.Company}`}>
                    {item.company}
                  </div>
                </div>
              </div>
              <div
                className={classes.heart}
                onClick={() => onWish(item.productId, item.wish)}
              >
                <div className={classes.IconWrapper}>
                  {item.wish ? (
                    <AiFillHeart size={25} className={classes.heartIconTrue} />
                  ) : (
                    <AiOutlineHeart
                      size={25}
                      className={classes.heartIconFalse}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>최근 본 상품이 없습니다.</div>
      )}
    </div>
  );
}
