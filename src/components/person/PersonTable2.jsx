import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import { Button, Card, CardBody, Input } from "@windmill/react-ui";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

//internal import
import useUtilsFunction from "@/hooks/useUtilsFunction";
import CheckBox from "@/components/form/others/CheckBox";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import MainDrawer from "@/components/drawer/MainDrawer";
import CouponDrawer from "@/components/drawer/CouponDrawer";
import ShowHideButton from "@/components/table/ShowHideButton";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import AnimatedContent from "@/components/common/AnimatedContent";

const PersonTable2 = ({ isCheck, coupons, setIsCheck }) => {
  const [updatedCoupons, setUpdatedCoupons] = useState([]);

  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  const { currency, showDateFormat, globalSetting, showingTranslateValue } =
    useUtilsFunction();

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    const result = coupons?.map((el) => {
      const newDate = new Date(el?.updatedAt).toLocaleString("en-US", {
        timeZone: globalSetting?.default_time_zone,
      });
      const newObj = {
        ...el,
        updatedDate: newDate,
      };
      return newObj;
    });
    setUpdatedCoupons(result);
  }, [coupons, globalSetting?.default_time_zone]);

  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}
      {isCheck.length < 2 && (
        <MainDrawer>
          <CouponDrawer id={serviceId} />
        </MainDrawer>
      )}
      <TableBody>
        {updatedCoupons?.map((coupon, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <div className="flex items-center">
                <div>
                  {coupon.IS_AN === 1 ? (
                    <span className="text-sm text-green-500">тийм</span>
                  ) : (
                    <span className="text-sm text-gray-500">үгүй</span>
                  )}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  {coupon.IS_INF === 1 ? (
                    <span className="text-sm text-green-500">тийм</span>
                  ) : (
                    <span className="text-sm text-gray-500">үгүй</span>
                  )}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.LAST_NAME}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.FIRST_NAME}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.NEW_KHOROO}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.PHONE_LAST}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.PHONE2}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.REGISTER}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.UUR}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.SONGUULIIN_BAIRSHIL}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            {/* <TableCell>
              <div className="flex items-center">
                <div>
                  {coupon.X === "0" ? (
                    <span className="text-sm text-gray-500">Өгөөгүй</span>
                  ) : (
                    <span className="text-sm text-green-500">Өгсөн</span>
                  )}
                </div>
              </div>{" "}
            </TableCell> */}

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.AGE}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">
                    {coupon.GENDER === 1 ? "эр" : "эм"}
                  </span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.BAIGUULLAGA_NAME}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.NEW_ADDRESS}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            {/* <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.UUR}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.SONGUULIIN_BAIRSHIL}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.SANAL_OGNOO}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.BORN_AIMAG}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.BORN_SOUM}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.IS_MAN}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.IS_AN}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.TSALIN}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.SCHOOL}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.GYEAR}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.TOLGOI_1}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.TOLGOI_2}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.TOLGOI_3}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.RELATION}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.KHOTHON_GUDAMJ}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.BAISHIN_GER}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.APARTMENT}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.X}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.Y}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{coupon.Z}</span>{" "}
                </div>
              </div>{" "}
            </TableCell> */}

            {/* <TableCell className="text-center">
              <ShowHideButton id={coupon._id} status={coupon.status} />
            </TableCell> */}

            {/* <TableCell>
              <span className="text-sm">
                {showDateFormat(coupon.startTime)}
              </span>
            </TableCell> */}

            {/* <TableCell
              className="sticky right-0 z-10 bg-teal-800 text-right text-white"
              style={{ boxShadow: "1px 0 5px rgba(0, 0, 0, 0.1)" }}
            >
              <EditDeleteButton
                id={coupon?._id}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(coupon?.title)}
              />
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default PersonTable2;
