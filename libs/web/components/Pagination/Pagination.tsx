import { useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import Typography from '../Typography/Typography';
import { ETextColor, ETextVariant } from '../../constants/enums';
import { calculatePaginationItems } from './Pagination.helper';

interface IProps {
  itemsPerPage: number;
  totalPages: number;
  setData: (val: number) => void;
  currentPage: number;
  setCurrentPage: (val: number) => void;
}

const Pagination = ({
  itemsPerPage,
  totalPages,
  setData,
  currentPage,
  setCurrentPage,
}: IProps) => {
  const visiblePageButtonCount = 6;

  const [pages, setPages] = useState(
    calculatePaginationItems(totalPages, currentPage, visiblePageButtonCount)
  );

  useEffect(() => {
    setPages(
      calculatePaginationItems(totalPages, currentPage, visiblePageButtonCount)
    );
  }, [currentPage, totalPages]);

  const handlePageClick = (value: number) => {
    setCurrentPage(value);
    setData(itemsPerPage * value - itemsPerPage);
  };

  const onNextClick = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
      setData(itemsPerPage * currentPage);
    }
  };

  const onLastClick = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(totalPages);
      setData(totalPages * itemsPerPage - itemsPerPage);
    }
  };

  const onPrevClick = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setData(itemsPerPage * (currentPage - 1) - itemsPerPage);
    }
  };

  const onFirstClick = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
      setData(0);
    }
  };

  return (
    <>
      {totalPages >= 2 && (
        <div className="flex items-center justify-end border-t border-gray-200 bg-white p-4 sm:flex-col">
          <Typography
            variant={ETextVariant.sm}
            color={ETextColor.gray}
            medium
            className="mr-2 sm:mb-4"
          >
            {itemsPerPage} items per page
          </Typography>
          <nav
            className="isolate inline-flex -space-x-px rounded-md"
            aria-label="Pagination"
          >
            <div
              onClick={onFirstClick}
              className="relative items-center px-2 py-2 text-gray-500 hover:text-gray-600"
            >
              <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div
              onClick={onPrevClick}
              className="relative items-center px-2 py-2 text-gray-500 hover:text-gray-600"
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {pages.map((page, index) => {
              return (
                <a
                  href="#"
                  key={index}
                  aria-current="page"
                  onClick={() => handlePageClick(page)}
                  className={classNames(
                    'relative z-10 inline-flex items-center rounded-full px-4 py-2 focus:z-20',
                    currentPage == page
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-600'
                  )}
                >
                  <Typography variant={ETextVariant.sm} medium>
                    {page}
                  </Typography>
                </a>
              );
            })}
            <div
              onClick={onNextClick}
              className="relative items-center px-2 py-2 text-gray-500 hover:text-gray-600"
            >
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div
              onClick={onLastClick}
              className="relative items-center px-2 py-2 text-gray-500 hover:text-gray-600"
            >
              <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Pagination;
