import React, { useEffect, useState } from "react";
import { copy, linkIcon, tick, loader } from "../assets";
import { useLazyGetsummaryQuery } from "../services/article";
import { useUser } from "@clerk/clerk-react";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copyUrl, setCopyUrl] = useState("");
  const [getSummary, { error, isFetching }] = useLazyGetsummaryQuery();
  const { isSignedIn } = useUser();

  useEffect(() => {
    const articlesLocalStore = JSON.parse(localStorage.getItem("articles"));
    if (articlesLocalStore) {
      setAllArticles(articlesLocalStore);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSignedIn) {
      alert("Please sign in to use this feature.");
      return;
    }

    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedArticles = [...allArticles, newArticle];
      setAllArticles(updatedArticles);
      setArticle({ ...newArticle, url: "" });

      localStorage.setItem("articles", JSON.stringify(updatedArticles));
    }
  };

  const handleDelete = (urlToDelete) => {
    const updatedArticles = allArticles.filter(
      (item) => item.url !== urlToDelete
    );
    setAllArticles(updatedArticles);

    localStorage.setItem("articles", JSON.stringify(updatedArticles));
  };

  const handleCopy = (copied) => {
    setCopyUrl(copied);
    navigator.clipboard.writeText(copied);
    setTimeout(() => setCopyUrl(false), 2000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="Link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter the article url"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto mt-4">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              className="link_card flex justify-between items-center"
            >
              <div
                className="copy_btn"
                onClick={() => handleCopy(item.url)}
              >
                <img
                  src={copyUrl === item.url ? tick : copy}
                  alt="copy_btn"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p
                onClick={() => setArticle(item)}
                className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate"
              >
                {item.url}
              </p>
              <button
                onClick={() => handleDelete(item.url)}
                className="text-red-500 font-semibold text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img
            src={loader}
            alt="loading"
            className="w-20 h-20 object-contain"
          />
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500 font-medium">
              Something went wrong... Please try again later.
              <br />
              <span className="font-satoshi font-normal ">
                {error?.data?.error}
              </span>
            </p>
          </div>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold ">
                Your Content Summary Goes Here..
              </h2>
              <div className="summary_box">
                <p className="font-inter font-sm text-sm text-justify">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
