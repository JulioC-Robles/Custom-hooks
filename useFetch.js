import { useEffect, useState } from "react";

const localcache = {};

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  });

  useEffect(() => {
    getFecht();
  }, [url]);
  const setLoadingState = () => {
    setState({
      data: null,
      isLoading: true,
      hasError: false,
      error: null,
    });
  };
  const getFecht = async () => {
    if (localcache[url]) {
      console.log("Usando cache");
      setState({
        data: localcache[url],
        isLoading: false,
        hasError: false,
        error: null,
      });
      return;
    }
    setLoadingState();
    const resp = await fetch(url);

    //slepp
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (!resp.ok) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          code: resp.status,
          mesagge: resp.statusText,
        },
      });
      return;
    }
    const data = await resp.json();
    setState({
      data: data,
      isLoading: false,
      hasError: false,
      error: null,
    });

    // Manejo del Cache
    localcache[url] = data;
  };
  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};
