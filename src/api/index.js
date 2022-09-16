import  Axios  from "axios";
import baseURL, { URLS } from "./URLS";

const appkey = 'gqg_1660891660435';
const request = Axios.create({
    baseURL,
    params: {
        appkey,
    },
});
request.interceptors.response.use((value) => value.data)

const getSideList = (type) => request.get(
    URLS.getSide,
    {
        params: {
            type
        }
    },
);
const getGoodlist = (type, page, size, sort) => request.get(
        URLS.getGoodsList,
        {
            params: {
                type,
                page,
                size,
                sort
            }
        }
);
const search = (type,page,size) => request.get(
    URLS.search,
    {
        params: {
            type,
            page,
            size
        },
    }
)
const likeSearch = (value) => request.get(
    URLS.likeSearch,
    {
        params: {
            likeValue: value,
        }
    }
)
const getGoodsByIds = (value) => request.get(
    URLS.getGoodsByIds,
    {
        params: {
            value,
        }
    }
)
export default {
    getSideList,
    getGoodlist,
    search,
    likeSearch,
    getGoodsByIds
}