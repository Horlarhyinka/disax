import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Accountcard from "./Accountcard";
import { AiFillHeart } from "react-icons/ai";
import { FaDonate } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { PiBookmarkFill } from "react-icons/pi";
import { TbLineDashed } from "react-icons/tb";
import axios from "axios";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Createcomment from "./Createcomment";

const Postcomponent = ({ category = "", type = "post", postId = "" }) => {
  const BACKENDURL = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = Cookies.get("token");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [isLike, setIsLike] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [page, setPage] = useState("");
  const [isModal, setIsModal] = useState(true);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-CSRFToken": `${Cookies.get("csrftoken")}`,
    };
    let url = category
      ? `${BACKENDURL}/api/${type}/?category=${category}`
      : `${BACKENDURL}/api/${type}/`;

    if (type !== "post") {
      url = `${BACKENDURL}/api/${type}/?post=${postId}`;
    }
    const fetchPosts = async () => {
      await axios
        .get(url, {
          headers: headers,
          withCredentials: true,
        })
        .then((res) => {
          setPosts(res.data);
          return res.data;
        })
        .catch((err) => console.log(err.message));
    };
    fetchPosts();
  }, [category, accessToken, BACKENDURL, type, postId]);

  const handlePostClick = (selectedPost) => {
    // Navigate to the comment page and pass the post data
    navigate(`/${selectedPost.id}/comments`, {
      state: { postData: selectedPost, category: category },
    });
  };

  const commentPage = (postId) => {
    if (type === "subcomment") {
      setPage(`/post/${postId}/subcomments`);
    } else {
      setPage(`/${postId}/comments`);
    }
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-CSRFToken": `${Cookies.get("csrftoken")}`,
  };

  const likePost = async (postId) => {
      await axios
        .put(
          `${BACKENDURL}/api/like_savepost/${postId}/`,
          { action: "like" },
          {
            headers: headers,
            withCredentials: true,
          }
        )
        .then((res) => {
          setIsLike(res.data.is_liked);
          console.log(res.data);
          return res.data;
        })
        .catch((err) => {
          console.log(err.message);
        });
  };

  const unlikePost = async (postId) => {
    await axios
      .put(
        `${BACKENDURL}/api/like_savepost/${postId}/`,
        { action: "like", like: false },
        {
          headers: headers,
          withCredentials: true,
        }
      )
      .then((res) => {
        setIsLike(res.data.is_liked);
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const savePost = async (postId) => {
    await axios
      .put(
        `${BACKENDURL}/api/like_savepost/${postId}/`,
        { action: "save" },
        {
          headers: headers,
          withCredentials: true,
        }
      )
      .then((res) => {
        setIsSave(res.data.is_saved);
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const unsavePost = async (postId) => {
    await axios
      .put(
        `${BACKENDURL}/api/like_savepost/${postId}/`,
        { action: "save", save: false },
        {
          headers: headers,
          withCredentials: true,
        }
      )
      .then((res) => {
        setIsSave(res.data.is_saved);
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleLike = async (postId) => {
    if (!isLike) {
      await likePost(postId);
    } else {
      await unlikePost(postId);
    }
  };
  const handleSave = async (postId) => {
    if (!isSave) {
      await savePost(postId);
    } else {
      await unsavePost(postId);
    }
  };

  const postsNew = [
    {
      user: "hello",
      content: "Hello this is sopposed to be content",
      image: "avatar",
      likers_count: 12,
      comments_count: 4,
      id: "diienr",
      is_saved: true,
      savers_count: 3
    },
    {
      user: "hello",
      content: "Hello this is sopposed to be content",
      image: "avatar",
      likers_count: 12,
      comments_count: 4,
      id: "diienr",
      is_saved: true,
      savers_count: 3
    },
  ]

  console.log(isModal)

  return (
    <div className="py-3">
      {postsNew.map((post, index) => (
        <div key={index} className="border-b-[1px] border-gray-300 py-4">
          <Accountcard user={post.user} />
          <div 
          // onClick={() => handlePostClick(post)}
          >
            <p className="text-left text-sm px-3 my-3 " >{post.content}</p>
            <img
              className="w-[100%] px-3 "
              src={`${BACKENDURL}/api/${post.image}`}
              alt=""
            />
          </div>
          <div className="flex flex-row justify-between px-3 mt-2 ">
            <div
              className="flex flex-row items-center"
              // onClick={() => {
              //   handleLike(post.id);
              // }}
            >
              <AiFillHeart size={18} color={post.is_liked ? "#e01616" : ""} />
              <p className="text-xs ml-1 ">{post.likers_count}</p>
            </div>
            <div className="flex flex-row items-center "
              onClick = {() => setIsModal(true)}
            >
              {
                isModal && 
                <Modal 
                  closeFn={() => setIsModal(false)}
                > 
                  <div className="flex flex-col text-base place-self-center shadow-sm  ">
                    <h2 className="text-xl font-bold text-left  ">Welcome to catesi wallet 👋🏽</h2>
                    <p className="w-80 py-3 text-left  ">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt fugit quasi quis aspernatur molestiae eum sed adipisci illo consectetur pariatur quaerat delectus, officiis saepe, cum provident totam nostrum odit repudiandae.
                    </p>
                    <button className="bg-linear px-4 py-2 rounded-full text-base  text-white self-end "  >Connect wallet</button>
                  </div>
                </Modal>
              }
              
              <FaDonate size={18} />
              <p className="text-xs ml-1 ">{post.comments_count}</p>
            </div>
            <Link to={page}>
              <div
                className="flex flex-row items-center  "
                // onClick={() => commentPage(post.id)}
              >
                <IoChatboxEllipses size={18} />
                <p className="text-xs ml-1 ">{post.comments_count}</p>
              </div>
            </Link>

            <div
              className="flex flex-row items-center"
              // onClick={() => {
              //   handleSave(post.id);
              // }}
            >
              <PiBookmarkFill
                size={18}
                color={post.is_saved ? "rgb(0 128 128 / 1)" : ""}
              />
              <p className="text-xs ml-1 ">{post.savers_count}</p>
            </div>
            <div className="flex flex-row items-center  ">
              <TbLineDashed size={18} />
              {/* <p className='text-xs ml-1 '>2</p> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

Postcomponent.propTypes = {
  category: PropTypes.string,
  type: PropTypes.string,
  postId: PropTypes.string,
};

export default Postcomponent;
