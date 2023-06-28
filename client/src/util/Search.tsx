import { RefObject } from "react";

interface SearchType {
  searchRef: RefObject<HTMLDivElement>;
  isDisplay: boolean;
  onClose: () => void;
}
export default function Search({ searchRef, isDisplay, onClose }: SearchType) {
  return (
    <>
      {" "}
      <div className="search-container">
        <div ref={searchRef} className={`${isDisplay ? "search" : "d-none"} `}>
          <div className="search-item">
            <div className="inputSearch">
              <p>Search</p>
              <input type="text" />
            </div>
            <i className="fas fa-search"></i>
          </div>
          <div onClick={onClose} className={` close`}>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className={`${isDisplay ? "before" : "d-none"} `}></div>
      </div>
    </>
  );
}
