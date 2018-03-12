import PropTypes from 'prop-types';
import React from 'react';
import { range } from 'lodash';
import './index.css';
const PADDING = 3;
const noop = () => {};

const FirstPaginationItem = ({ onClick }) => (
  <li className="pagination-item">
    <button className="button" type="button" onClick={() => onClick(1)}>
      &laquo;
    </button>
  </li>
);

const LastPaginationItem = ({ onClick, totalPages }) => (
  <li className="pagination-item">
    <button
      className="button"
      type="button"
      onClick={() => onClick(totalPages)}
    >
      &raquo;
    </button>
  </li>
);

const PrevPaginationItem = ({ onClick, prevPage }) => (
  <li className="pagination-item">
    <button className="button" type="button" onClick={() => onClick(prevPage)}>
      &lt;
    </button>
  </li>
);

const NextPaginationItem = ({ onClick, nextPage }) => (
  <li className="pagination-item">
    <button className="button" type="button" onClick={() => onClick(nextPage)}>
      &gt;
    </button>
  </li>
);

const Gap = () => (
  <li className="pagination-item">
    <span className="gap">&hellip;</span>
  </li>
);

const Pagination = ({ totalPages, currentPage, onSelect }) => {
  const firstPage =
    currentPage > 1 ? <FirstPaginationItem onClick={onSelect} /> : null;

  const lastPage =
    currentPage !== totalPages ? (
      <LastPaginationItem onClick={onSelect} totalPages={totalPages} />
    ) : null;

  const previousPage =
    currentPage >= 2 ? (
      <PrevPaginationItem onClick={onSelect} prevPage={currentPage - 1} />
    ) : null;

  const nextPage =
    currentPage + 1 <= totalPages ? (
      <NextPaginationItem onClick={onSelect} nextPage={currentPage + 1} />
    ) : null;

  // 現在のページと現在のページの左右にPADDINGで指定した数のアイテムを作成します
  const pages = [
    ...range(currentPage - PADDING, currentPage).filter(page => page >= 1),
    ...range(currentPage, currentPage + PADDING + 1).filter(
      page => page <= totalPages,
    ),
  ].map(page => {
    const isCurrent = page === currentPage;
    return (
      <li className="pagination-item" key={page}>
        {
          <button
            type="button"
            className={isCurrent ? 'button is-primary' : 'button'}
            onClick={isCurrent ? noop : () => onSelect(page)}
          >
            {page}
          </button>
        }
      </li>
    );
  });

  // 左右に `...` を表示する条件を追加
  const leftGap = currentPage > PADDING + 1 ? <Gap /> : null;
  const rightGap = currentPage + PADDING < totalPages ? <Gap /> : null;

  return (
    <ul className="pagination-buttons">
      {firstPage}
      {previousPage}
      {leftGap}
      {pages}
      {rightGap}
      {nextPage}
      {lastPage}
    </ul>
  );
};

FirstPaginationItem.propTypes = {
  onClick: PropTypes.func.isRequired,
};

LastPaginationItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};

PrevPaginationItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  prevPage: PropTypes.number.isRequired,
};

NextPaginationItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  nextPage: PropTypes.number.isRequired,
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Pagination;
