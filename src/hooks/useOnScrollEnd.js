import { useEffect, useState } from 'react';

import { selectOptionsParser } from '../utils/selectOptionsParser';

export const useOnScrollEnd = ({ data, setSelectListPage, value, label, shouldReturnAllData }) => {
  const [options, setOptions] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    if (data?.number) {
      setOptions([...options, ...selectOptionsParser(data.content, label, value)]);

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