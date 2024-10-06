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

const Coupons = () => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const { t } = useTranslation();
  const { toggleDrawer, lang } = useContext(SidebarContext);

  const [searchRegister, setSearchRegister] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchHoroo, setSearchHoroo] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchSum, setSearchSum] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchIsInf, setSearchIsInf] = useState(-1);
  const [searchIsMan, setSearchIsMan] = useState(-1);
  const [searchIsAn, setSearchIsAn] = useState(-1);

  const registerRef = useRef("");
  const lastNameRef = useRef("");
  const firstNameRef = useRef("");
  const horooRef = useRef("");
  const addressRef = useRef("");
  const sumRef = useRef("");
  const phoneRef = useRef("");
  const isInfRef = useRef("");
  const isManRef = useRef("");
  const isAnRef = useRef("");

  const [error, setError] = useState("");

  const getCallback = useCallback(async () => {
    setError("");
    const q = new URLSearchParams();

    q.append("register", searchRegister);
    q.append("lastName", searchLastName);
    q.append("firstName", searchFirstName);
    q.append("horoo", searchHoroo);
    q.append("address", searchAddress);
    q.append("sum", searchSum);
    q.append("phone", searchPhone);
    q.append("isInf", searchIsInf);
    q.append("isMan", searchIsMan);
    q.append("isAn", searchIsAn);

    try {
      const resp = await CouponServices.getAllCoupons(q);
      return resp;
    } catch (err) {
      setError("Өөр шүүлтүүр нэмнэ үү!");
    }

    return [];
  }, [
    searchRegister,
    searchLastName,
    searchFirstName,
    searchHoroo,
    searchAddress,
    searchSum,
    searchPhone,
    searchIsInf,
    searchIsMan,
    searchIsAn,
  ]);

  const loading = false;
  const [data, setData] = useState([]);

  useEffect(() => {
    async function ff(params) {
      setData(await getCallback());
    }
    ff();
  }, [getCallback]);

  // console.log("data", data.length);
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

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  // handle reset field function
  const handleResetField = () => {
    setSearchCoupon("");
    registerRef.current.value = "";
    lastNameRef.current.value = "";
    firstNameRef.current.value = "";
    horooRef.current.value = "";
    addressRef.current.value = "";
    sumRef.current.value = "";
    phoneRef.current.value = "";
    isInfRef.current.value = -1;
    isManRef.current.value = -1;
    isAnRef.current.value = -1;
  };

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
        {adminInfo.role === "Admin" && (
          <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
            <CardBody>
              <form
                onSubmit={handleSubmitCoupon}
                className="py-3 grid gap-4 lg:gap-6 xl:gap-6  xl:flex"
              >
                <div className="flex justify-start xl:w-1/2  md:w-full">
                  <UploadMany
                    title="Coupon"
                    exportData={data}
                    filename={filename}
                    isDisabled={isDisabled}
                    handleSelectFile={handleSelectFile}
                    handleUploadMultiple={handleUploadMultiple}
                    handleRemoveSelectFile={handleRemoveSelectFile}
                  />
                </div>

                <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0">
                  <div className="w-full md:w-40 lg:w-40 xl:w-40 mr-3 mb-3 lg:mb-0">
                    <Button
                      disabled={isCheck.length < 1}
                      onClick={() => handleUpdateMany(isCheck)}
                      className="w-full rounded-md h-12 btn-gray text-gray-600"
                    >
                      <span className="mr-2">
                        <FiEdit />
                      </span>
                      {t("BulkAction")}
                    </Button>
                  </div>

                  <div className="w-full md:w-32 lg:w-32 xl:w-32 mr-3 mb-3 lg:mb-0">
                    <Button
                      disabled={isCheck.length < 1}
                      onClick={() => handleDeleteMany(isCheck)}
                      className="w-full rounded-md h-12 bg-red-500 btn-red"
                    >
                      <span className="mr-2">
                        <FiTrash2 />
                      </span>
                      Устгах
                    </Button>
                  </div>

                  <div className="w-full md:w-48 lg:w-48 xl:w-48">
                    <Button
                      onClick={toggleDrawer}
                      className="w-full rounded-md h-12"
                    >
                      <span className="mr-2">
                        <FiPlus />
                      </span>
                      Нэмэх
                    </Button>
                  </div>
                </div>
              </form>
            </CardBody>
          </Card>
        )}

        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
              <div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginBottom: "8px",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Дэмжсэн
                </div>
                <Select
                  ref={isInfRef}
                  onChange={(e) => setSearchIsInf(e.target.value)}
                >
                  <option value={-1} defaultValue>
                    {"Nan"}
                  </option>
                  <option value={0}>{"Үгүй"}</option>
                  <option value={1}>{"Тийм"}</option>
                </Select>
              </div>

              <div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginBottom: "8px",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  МАН
                </div>
                <Select
                  ref={isManRef}
                  onChange={(e) => setSearchIsMan(e.target.value)}
                >
                  <option value={-1} defaultValue>
                    {"Nan"}
                  </option>
                  <option value={0}>{"Үгүй"}</option>
                  <option value={1}>{"Тийм"}</option>
                </Select>
              </div>

              <div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginBottom: "8px",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  АН
                </div>
                <Select
                  ref={isAnRef}
                  onChange={(e) => setSearchIsAn(e.target.value)}
                >
                  <option value={-1} defaultValue>
                    {"Nan"}
                  </option>
                  <option value={0}>{"Үгүй"}</option>
                  <option value={1}>{"Тийм"}</option>
                </Select>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearchRegister(registerRef.current.value);
                setSearchLastName(lastNameRef.current.value);
                setSearchFirstName(firstNameRef.current.value);
                setSearchHoroo(horooRef.current.value);
                setSearchAddress(addressRef.current.value);
                setSearchSum(sumRef.current.value);
                setSearchPhone(phoneRef.current.value);
                setSearchIsInf(isInfRef.current.value);
                setSearchIsMan(isManRef.current.value);
                setSearchIsAn(isAnRef.current.value);
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

              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Input ref={lastNameRef} type="search" placeholder={"Овог"} />
              </div>

              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Input ref={firstNameRef} type="search" placeholder={"Нэр"} />
              </div>

              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Input ref={horooRef} type="search" placeholder={"Хороо"} />
              </div>

              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Input ref={addressRef} type="search" placeholder={"Хаяг"} />
              </div>

              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Input ref={sumRef} type="search" placeholder={"Т/Сум"} />
              </div>

              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Input ref={phoneRef} type="search" placeholder={"Утас"} />
              </div>

              <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <div className="w-full mx-1">
                  <Button type="submit" className="h-12 w-full bg-emerald-700">
                    Filter
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
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>
                  <CheckBox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    handleClick={handleSelectAll}
                    isChecked={isCheckAll}
                  />
                </TableCell>
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
            <CouponTable
              lang={lang}
              isCheck={isCheck}
              coupons={dataTable}
              setIsCheck={setIsCheck}
            />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Илэрч олдсонгүй." />
      )}
    </>
  );
};

export default Coupons;
