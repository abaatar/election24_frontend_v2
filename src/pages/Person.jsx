import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  Select,
} from "@windmill/react-ui";
import { useCallback, useContext, useEffect, useState, useRef } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { useTranslation } from "react-i18next";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import CouponServices from "@/services/CouponServices";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import useFilter from "@/hooks/useFilter";
import PageTitle from "@/components/Typography/PageTitle";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import MainDrawer from "@/components/drawer/MainDrawer";
import CouponDrawer from "@/components/drawer/CouponDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import CheckBox from "@/components/form/others/CheckBox";
import CouponTable from "@/components/coupon/CouponTable";
import NotFound from "@/components/table/NotFound";
import UploadMany from "@/components/common/UploadMany";
import AnimatedContent from "@/components/common/AnimatedContent";

import { AdminContext } from "@/context/AdminContext";
import PersonTable from "@/components/person/PersonTable";

const Person = () => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const { t } = useTranslation();
  const { toggleDrawer, lang } = useContext(SidebarContext);

  const [searchRegister, setSearchRegister] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const registerRef = useRef("");

  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [familyData, setFamilyData] = useState([]);
  const [baiguullagaData, setBaiguullagaData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);

  const getCallback = useCallback(async () => {
    setError("");
    const q = new URLSearchParams();

    q.append("register", searchRegister);

    try {
      const resp = await CouponServices.getAllCoupons(q);
      return resp;
    } catch (err) {
      setError("Өөр шүүлтүүр нэмнэ үү!");
    }

    return [];
  }, [searchRegister]);

  // Same Address
  const getCallback1 = useCallback(async () => {
    setError("");
    const q = new URLSearchParams();

    if (data.length > 0) q.append("address", data[0].NEW_ADDRESS);

    try {
      const resp = await CouponServices.getAllCoupons(q);
      return resp;
    } catch (err) {
      setError("Өөр шүүлтүүр нэмнэ үү!");
    }

    return [];
  }, [data]);
  //

  // Same BAIGUULLAGA_NAME
  const getCallback2 = useCallback(async () => {
    setError("");
    const q = new URLSearchParams();

    if (data.length > 0) q.append("baiguullaga", data[0].BAIGUULLAGA_NAME);

    try {
      const resp = await CouponServices.getAllCoupons(q);
      return resp;
    } catch (err) {
      setError("Өөр шүүлтүүр нэмнэ үү!");
    }

    return [];
  }, [data]);
  //

  // Same School
  const getCallback3 = useCallback(async () => {
    setError("");
    const q = new URLSearchParams();

    if (data.length > 0) q.append("school", data[0].SCHOOL);

    try {
      const resp = await CouponServices.getAllCoupons(q);
      return resp;
    } catch (err) {
      setError("Өөр шүүлтүүр нэмнэ үү!");
    }

    return [];
  }, [data]);
  //

  const loading = false;

  useEffect(() => {
    async function ff(params) {
      setData(await getCallback());
    }
    ff();
  }, [getCallback]);

  useEffect(() => {
    async function ff(params) {
      setFamilyData(
        (await getCallback1()).filter((gg) => gg.REGISTER !== data[0].REGISTER)
      );
    }
    ff();
  }, [getCallback1]);

  useEffect(() => {
    async function ff(params) {
      setBaiguullagaData(
        (await getCallback2()).filter((gg) => gg.REGISTER !== data[0].REGISTER)
      );
    }
    ff();
  }, [getCallback2]);

  useEffect(() => {
    async function ff(params) {
      setSchoolData(
        (await getCallback3()).filter((gg) => gg.REGISTER !== data[0].REGISTER)
      );
    }
    ff();
  }, [getCallback3]);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const { allId, serviceId, handleDeleteMany, handleUpdateMany } =
    useToggleDrawer();

  const {
    filename,
    isDisabled,
    dataTable,
    serviceData,
    totalResults,
    resultsPerPage,
    handleChangePage,
    handleSelectFile,
    setSearchCoupon,
    handleSubmitCoupon,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useFilter(data);

  const {
    filename: filename1,
    isDisabled: isDisabled1,
    dataTable: dataTable1,
    serviceData: serviceData1,
    totalResults: totalResults1,
    resultsPerPage: resultsPerPage1,
    handleChangePage: handleChangePage1,
    handleSelectFile: handleSelectFile1,
    setSearchCoupon: setSearchCoupon1,
    handleSubmitCoupon: handleSubmitCoupon1,
    handleUploadMultiple: handleUploadMultiple1,
    handleRemoveSelectFile: handleRemoveSelectFile1,
  } = useFilter(familyData);

  const {
    filename: filename2,
    isDisabled: isDisabled2,
    dataTable: dataTable2,
    serviceData: serviceData2,
    totalResults: totalResults2,
    resultsPerPage: resultsPerPage2,
    handleChangePage: handleChangePage2,
    handleSelectFile: handleSelectFile2,
    setSearchCoupon: setSearchCoupon2,
    handleSubmitCoupon: handleSubmitCoupon2,
    handleUploadMultiple: handleUploadMultiple2,
    handleRemoveSelectFile: handleRemoveSelectFile2,
  } = useFilter(baiguullagaData);

  const {
    filename: filename3,
    isDisabled: isDisabled3,
    dataTable: dataTable3,
    serviceData: serviceData3,
    totalResults: totalResults3,
    resultsPerPage: resultsPerPage3,
    handleChangePage: handleChangePage3,
    handleSelectFile: handleSelectFile3,
    setSearchCoupon: setSearchCoupon3,
    handleSubmitCoupon: handleSubmitCoupon3,
    handleUploadMultiple: handleUploadMultiple3,
    handleRemoveSelectFile: handleRemoveSelectFile3,
  } = useFilter(schoolData);

  // handle reset field function
  const handleResetField = () => {
    setSearchCoupon("");
    registerRef.current.value = "";
  };

  // console.log("dataTable", dataTable);
  // console.log("data", data);
  // console.log("familyData", familyData);

  return (
    <>
      <PageTitle>Илэрц</PageTitle>
      <DeleteModal
        ids={allId}
        setIsCheck={setIsCheck}
        title="Selected Coupon"
      />
      <BulkActionDrawer ids={allId} title="Coupons" />

      <MainDrawer>
        <CouponDrawer id={serviceId} />
      </MainDrawer>

      <AnimatedContent>
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearchRegister(registerRef.current.value);
              }}
              className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
            >
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Input
                  ref={registerRef}
                  type="search"
                  placeholder={"Регистр"}
                />
              </div>

              <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <div className="w-full mx-1">
                  <Button type="submit" className="h-12 w-full bg-emerald-700">
                    Хайх
                  </Button>
                </div>

                <div className="w-full mx-1">
                  <Button
                    layout="outline"
                    onClick={handleResetField}
                    type="reset"
                    className="px-4 md:py-1 py-2 h-12 text-sm dark:bg-gray-700"
                  >
                    <span className="text-black dark:text-gray-200">Reset</span>
                  </Button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </AnimatedContent>

      {loading ? (
        // <Loading loading={loading} />
        <TableLoading row={12} col={8} width={140} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : serviceData?.length !== 0 ? (
        <>
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Регистр</TableCell>
                  <TableCell>Овог</TableCell>
                  <TableCell>Нэр</TableCell>
                  <TableCell>Дэмжсэн</TableCell>
                  <TableCell>Нас</TableCell>
                  <TableCell>Хүйс</TableCell>
                  <TableCell>Хороо</TableCell>
                  <TableCell>Хаяг</TableCell>
                  <TableCell>Байгууллага</TableCell>
                  <TableCell>Утас 1</TableCell>
                  <TableCell>Утас 2</TableCell>
                  {/* <TableCell>Үүр</TableCell>
                <TableCell>Сонгуулийн Байршил</TableCell>
                <TableCell>Санал Огноо</TableCell>
                <TableCell>Төрсөн Аймаг</TableCell>
                <TableCell>Төрсөн Сум</TableCell>
                <TableCell>IS_MAN</TableCell>
                <TableCell>IS_AN</TableCell>
                <TableCell>TSALIN</TableCell>
                <TableCell>SCHOOL</TableCell>
                <TableCell>GYEAR</TableCell>
                <TableCell>TOLGOI_1</TableCell>
                <TableCell>TOLGOI_2</TableCell>
                <TableCell>TOLGOI_3</TableCell>
                <TableCell>RELATION </TableCell>
                <TableCell>KHOTHON_GUDAMJ</TableCell>
                <TableCell>BAISHIN_GER</TableCell>
                <TableCell>APARTMENT</TableCell>
                <TableCell>X</TableCell>
                <TableCell>Y</TableCell>
                <TableCell>Z</TableCell> */}

                  {/* <TableCell className="text-center">
                  {t("catPublishedTbl")}
                </TableCell> */}
                  {/* <TableCell>{t("CoupTblStartDate")}</TableCell>
                <TableCell>{t("CoupTblEndDate")}</TableCell> */}
                  {/* <TableCell>{t("CoupTblStatus")}</TableCell> */}
                  {/* <TableCell
                  className="sticky right-0 z-10 bg-teal-800 text-right text-white"
                  style={{ boxShadow: "1px 0 5px rgba(0, 0, 0, 0.1)" }}
                >
                  {t("CoupTblActions")}
                </TableCell> */}
                </tr>
              </TableHeader>
              <PersonTable
                lang={lang}
                isCheck={isCheck}
                coupons={dataTable}
                setIsCheck={setIsCheck}
              />
            </Table>
          </TableContainer>
          <div className="w-full mx-1">
            <Button className="h-12 w-full bg-emerald-700">Гэр бүл</Button>
          </div>

          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Регистр</TableCell>
                  <TableCell>Овог</TableCell>
                  <TableCell>Нэр</TableCell>
                  <TableCell>Дэмжсэн</TableCell>
                  <TableCell>Нас</TableCell>
                  <TableCell>Хүйс</TableCell>
                  <TableCell>Хороо</TableCell>
                  <TableCell>Хаяг</TableCell>
                  <TableCell>Байгууллага</TableCell>
                  <TableCell>Утас 1</TableCell>
                  <TableCell>Утас 2</TableCell>
                </tr>
              </TableHeader>
              <PersonTable
                lang={lang}
                isCheck={isCheck}
                coupons={dataTable1}
                setIsCheck={setIsCheck}
              />
            </Table>
            <TableFooter>
              <Pagination
                totalResults={totalResults1}
                resultsPerPage={resultsPerPage1}
                onChange={handleChangePage1}
                label="Table navigation"
              />
            </TableFooter>
          </TableContainer>

          <div className="w-full mx-1">
            <Button className="h-12 w-full bg-emerald-700">Сургууль</Button>
          </div>

          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Регистр</TableCell>
                  <TableCell>Овог</TableCell>
                  <TableCell>Нэр</TableCell>
                  <TableCell>Дэмжсэн</TableCell>
                  <TableCell>Нас</TableCell>
                  <TableCell>Хүйс</TableCell>
                  <TableCell>Хороо</TableCell>
                  <TableCell>Хаяг</TableCell>
                  <TableCell>Байгууллага</TableCell>
                  <TableCell>Утас 1</TableCell>
                  <TableCell>Утас 2</TableCell>
                </tr>
              </TableHeader>
              <PersonTable
                lang={lang}
                isCheck={isCheck}
                coupons={dataTable3}
                setIsCheck={setIsCheck}
              />
            </Table>
            <TableFooter>
              <Pagination
                totalResults={totalResults3}
                resultsPerPage={resultsPerPage3}
                onChange={handleChangePage3}
                label="Table navigation"
              />
            </TableFooter>
          </TableContainer>

          <div className="w-full mx-1">
            <Button className="h-12 w-full bg-emerald-700">Ажлын газар</Button>
          </div>

          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Регистр</TableCell>
                  <TableCell>Овог</TableCell>
                  <TableCell>Нэр</TableCell>
                  <TableCell>Дэмжсэн</TableCell>
                  <TableCell>Нас</TableCell>
                  <TableCell>Хүйс</TableCell>
                  <TableCell>Хороо</TableCell>
                  <TableCell>Хаяг</TableCell>
                  <TableCell>Байгууллага</TableCell>
                  <TableCell>Утас 1</TableCell>
                  <TableCell>Утас 2</TableCell>
                </tr>
              </TableHeader>
              <PersonTable
                lang={lang}
                isCheck={isCheck}
                coupons={dataTable2}
                setIsCheck={setIsCheck}
              />
            </Table>
            <TableFooter>
              <Pagination
                totalResults={totalResults2}
                resultsPerPage={resultsPerPage2}
                onChange={handleChangePage2}
                label="Table navigation"
              />
            </TableFooter>
          </TableContainer>
        </>
      ) : (
        <NotFound title="Илэрч олдсонгүй." />
      )}
    </>
  );
};

export default Person;
