import React, {useEffect, useState} from "react";
import AddArticle from "./add-article/add-article";

import style from "./admin-blog.module.scss";
import ListArticles from "./list-articles/list-articles";
import axios from "../../axios";
import {toast} from "react-hot-toast";
import EditArticle from "./edit-article/edit-article";

const AdminBlog = () => {
    const [articleList, setArticleList] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [isAwaitingRefresh, setIsAwaitingRefresh] = useState(false);

    const addArticle = (article) => {
        const newList = [...articleList];
        newList.push(article);
        setArticleList(newList);
    }

    const removeArticle = (article) => {
        const newList = [...articleList];
        const articleIndex = newList.indexOf(article);
        newList.splice(articleIndex, 1);
        setArticleList(newList);
    }

    const editArticle = (article) => {
        const newList = [...articleList];
        const articleIndex = newList.indexOf(article);
        console.log(articleList);
        newList.splice(articleIndex, 1, article);
        console.log(newList);
        setArticleList(newList);
    }

    // Get all posts
    useEffect(() => {
        setIsAwaitingRefresh(true);
        axios.get("/api/posts")
            .then(response => {
                console.log(response);
                setArticleList(response.data["hydra:member"]);
                setIsAwaitingRefresh(false);
            })
            .catch(err => {
                toast.error(err.response.data["hydra:description"]);
                setIsAwaitingRefresh(false);
            })
    }, [setArticleList]);

    // Get edited post
    const getEditArticle = () => {
        for (const i in articleList) {
            if (articleList[i].id === isEditing) {
                return articleList[i];
            }
        }
    };

    return (
        <div className={style.adminBlog}>
            <ListArticles articleList={articleList} removeArticle={removeArticle} addArticle={addArticle} isAwaitingRefresh={isAwaitingRefresh} setIsEditing={setIsEditing}/>
            { !isEditing ?
                <AddArticle addArticle={addArticle}/>
                :
                <EditArticle editArticle={editArticle} article={getEditArticle()} setIsEditing={setIsEditing}/>
            }
        </div>
    );
}

export default AdminBlog;