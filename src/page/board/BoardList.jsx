import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faComment,
  faHeart,
  faImages,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchType, setSearchType] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  useEffect(() => {
    axios
      .get(`/api/board/list?${searchParams}`)
      .then((res) => {
        setBoardList(res.data.boardList);
        setPageInfo(res.data.pageInfo);
      })
      .catch()
      .finally();

    setSearchType("all");
    setSearchKeyword("");

    const typeParam = searchParams.get("type");
    const keywordParam = searchParams.get("keyword");
    if (typeParam) {
      setSearchKeyword(typeParam);
    }
    if (keywordParam) {
      setSearchKeyword(keywordParam);
    }
  }, [searchParams]); // searchParams 변경 시 함수 재실행

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  function handleSearchClick() {
    navigate(`/?type=${searchType}&keyword=${searchKeyword}`);
  }

  function handlePageButtonClick(pageNumber) {
    searchParams.set("page", pageNumber);
    navigate(`/?${searchParams}`);
  }

  return (
    <Box>
      <Box mb={10}>
        <Heading>Board View</Heading>
      </Box>
      <Box mb={10}>
        {boardList.length === 0 && <Center>조회 결과가 없습니다.</Center>}
        {boardList.length > 0 && (
          <Table>
            <Thead>
              <Tr>
                <Th w={20}>#</Th>
                <Th>TITLE</Th>
                <Th w={20}>
                  <FontAwesomeIcon icon={faHeart} />
                </Th>
                <Th w={40}>
                  <FontAwesomeIcon icon={faUserSecret} />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {boardList.map((board) => (
                <Tr
                  onClick={() => navigate(`/board/${board.id}`)}
                  key={board.id}
                  _hover={{ bgColor: "gray.100" }}
                  cursor={"pointer"}
                >
                  <Td>{board.id}</Td>
                  <Td>
                    {board.title}
                    {board.numberOfImages > 0 && (
                      <Badge ml={2}>
                        <FontAwesomeIcon icon={faImages} />
                        {board.numberOfImages}
                      </Badge>
                    )}
                    {board.numberOfComments > 0 && (
                      <Badge ml={2}>
                        <FontAwesomeIcon icon={faComment} />
                        {board.numberOfComments}
                      </Badge>
                    )}
                  </Td>
                  <Td>{board.numberOfLike > 0 ? board.numberOfLike : 0}</Td>
                  <Td>{board.writer}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
      <Center mb={10}>
        <Flex gap={1}>
          <Box>
            <Select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value={"all"}>전체</option>
              <option value={"text"}>글</option>
              <option value={"nickName"}>작성자</option>
            </Select>
          </Box>
          <Box>
            <Input
              value={searchKeyword}
              placeholder={"검색어"}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </Box>
          <Box>
            <Button type={"submit"} onClick={handleSearchClick}>
              Search
            </Button>
          </Box>
        </Flex>
      </Center>
      <Box>
        <Center gap={1}>
          {pageInfo.prevPageNumber && (
            <>
              <ButtonGroup size={"sm"} variant="outline">
                <Button onClick={() => handlePageButtonClick(1)}>
                  <FontAwesomeIcon icon={faAnglesLeft} />
                </Button>
                <Button
                  onClick={() => handlePageButtonClick(pageInfo.prevPageNumber)}
                >
                  <FontAwesomeIcon icon={faAngleLeft} />
                </Button>
              </ButtonGroup>
            </>
          )}
          {pageNumbers.map((pageNumber) => (
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={() => handlePageButtonClick(pageNumber)}
              key={pageNumber}
              colorScheme={
                pageNumber === pageInfo.currentPageNumber ? "blue" : "gray"
              }
            >
              {pageNumber}
            </Button>
          ))}
          {pageInfo.nextPageNumber && (
            <>
              <ButtonGroup size={"sm"} variant="outline">
                <Button
                  onClick={() => handlePageButtonClick(pageInfo.nextPageNumber)}
                >
                  <FontAwesomeIcon icon={faAngleRight} />
                </Button>
                <Button
                  onClick={() => handlePageButtonClick(pageInfo.lastPageNumber)}
                >
                  <FontAwesomeIcon icon={faAnglesRight} />
                </Button>
              </ButtonGroup>
            </>
          )}
        </Center>
      </Box>
    </Box>
  );
}
