import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

//internal import
import useUtilsFunction from "@/hooks/useUtilsFunction";
import CheckBox from "@/components/form/others/CheckBox";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import MainDrawer from "@/components/drawer/MainDrawer";
import PinkDrawer from "@/components/drawer/PinkDrawer";
import ShowHideButton from "@/components/table/ShowHideButton";
import EditDeleteButton from "@/components/table/EditDeleteButton";

const PinkTable = ({ isCheck, pinks, setIsCheck }) => {
  const [updatedPinks, setUpdatedPinks] = useState([]);

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
    const result = pinks?.map((el) => {
      const newDate = new Date(el?.updatedAt).toLocaleString("en-US", {
        timeZone: globalSetting?.default_time_zone,
      });
      const newObj = {
        ...el,
        updatedDate: newDate,
      };
      return newObj;
    });
    setUpdatedPinks(result);
  }, [pinks, globalSetting?.default_time_zone]);

  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck.length < 2 && (
        <MainDrawer>
          <PinkDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {updatedPinks?.map((pink, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name={pink?.title?.en}
                id={pink._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(pink._id)}
              />
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.REGISTER}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.LAST_NAME}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.FIRST_NAME}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  {pink.IS_INF === 0 ? (
                    <span className="text-sm text-gray-500">Тодорхойгүй</span>
                  ) : (
                    <span className="text-sm text-green-500">Дэмжсэн</span>
                  )}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  {pink.X === 0 ? (
                    <span className="text-sm text-gray-500">Өгөөгүй</span>
                  ) : (
                    <span className="text-sm text-green-500">Өгсөн</span>
                  )}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.AGE}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">
                    {pink.GENDER === 1 ? "эр" : "эм"}
                  </span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.NEW_KHOROO}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.NEW_ADDRESS}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.BAIGUULLAGA_NAME}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.PHONE_LAST}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.PHONE2}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            {/* <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.UUR}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.SONGUULIIN_BAIRSHIL}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.SANAL_OGNOO}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.BORN_AIMAG}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.BORN_SOUM}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.IS_MAN}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.IS_AN}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.TSALIN}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.SCHOOL}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.GYEAR}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.TOLGOI_1}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.TOLGOI_2}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.TOLGOI_3}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.RELATION}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.KHOTHON_GUDAMJ}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.BAISHIN_GER}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.APARTMENT}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.X}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.Y}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pink.Z}</span>{" "}
                </div>
              </div>{" "}
            </TableCell> */}

            {/* <TableCell className="text-center">
              <ShowHideButton id={pink._id} status={pink.status} />
            </TableCell> */}

            {/* <TableCell>
              <span className="text-sm">
                {showDateFormat(pink.startTime)}
              </span>
            </TableCell> */}

            {/* <TableCell
              className="sticky right-0 z-10 bg-teal-800 text-right text-white"
              style={{ boxShadow: "1px 0 5px rgba(0, 0, 0, 0.1)" }}
            >
              <EditDeleteButton
                id={pink?._id}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(pink?.title)}
              />
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default PinkTable;
