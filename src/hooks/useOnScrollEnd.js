import { useEffect, useState } from 'react';

import { selectOptionsParser } from '../utils/selectOptionsParser';

export const useOnScrollEnd = ({ data, setSelectListPage, value, label, shouldReturnAllData }) => {
  const [options, setOptions] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    if (data) {
      setOptions([...options, ...selectOptionsParser(data, label, value)]);

      if (shouldReturnAllData) {
        setAllData([...allData, ...data.content])
      }
    }

  }, [data]);

  useEffect(() => () => setSelectListPage(1), [])

  // sending next page request when scrolling end
  const onScrollEnd = (event) => {
    if (data) {
      if (event.target.scrollTop + event.target.offsetHeight === event.target.scrollHeight) {
        if (data?.total_pages > data?.number) {
          setSelectListPage(data.number + 1)
        }
      }
    }
  };

  return { options, onScrollEnd, allData }
};


export function useOnClickOutside(
    ref,
    handler
) {
  useEffect(() => {
    const listener = (event) => {
      //@ts-ignore
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    //@ts-ignore
    document.addEventListener("mousedown", listener);
    //@ts-ignore
    document.addEventListener("touchstart", listener);

    return () => {
      //@ts-ignore
      document.removeEventListener("mousedown", listener);
      //@ts-ignore
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}