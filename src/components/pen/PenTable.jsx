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
import PenDrawer from "@/components/drawer/PenDrawer";
import ShowHideButton from "@/components/table/ShowHideButton";
import EditDeleteButton from "@/components/table/EditDeleteButton";

const PenTable = ({ isCheck, pens, setIsCheck }) => {
  const [updatedPens, setUpdatedPens] = useState([]);

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
    const result = pens?.map((el) => {
      const newDate = new Date(el?.updatedAt).toLocaleString("en-US", {
        timeZone: globalSetting?.default_time_zone,
      });
      const newObj = {
        ...el,
        updatedDate: newDate,
      };
      return newObj;
    });
    setUpdatedPens(result);
  }, [pens, globalSetting?.default_time_zone]);

  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck.length < 2 && (
        <MainDrawer>
          <PenDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {updatedPens?.map((pen, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name={pen?.title?.en}
                id={pen._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(pen._id)}
              />
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pen.REGISTER}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pen.TOLGOI_1}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pen.TOLGOI_2}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pen.TOLGOI_3}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  <span className="text-sm">{pen.RELATION}</span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <div>
                  {pen.STATUS === 2 && (
                    <span className="text-sm text-green-500">Амжилттай</span>
                  )}
                  {pen.STATUS === 1 && (
                    <span className="text-sm text-blue-500">Давхардсан</span>
                  )}
                  {pen.STATUS === 0 && (
                    <span className="text-sm text-red-500">Алдаа</span>
                  )}
                </div>
              </div>{" "}
            </TableCell>

            {/* <TableCell className="text-center">
              <ShowHideButton id={pen._id} status={pen.status} />
            </TableCell> */}

            {/* <TableCell>
              <span className="text-sm">
                {showDateFormat(pen.startTime)}
              </span>
            </TableCell> */}

            {/* <TableCell
              className="sticky right-0 z-10 bg-teal-800 text-right text-white"
              style={{ boxShadow: "1px 0 5px rgba(0, 0, 0, 0.1)" }}
            >
              <EditDeleteButton
                id={pen?._id}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(pen?.title)}
              />
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default PenTable;
