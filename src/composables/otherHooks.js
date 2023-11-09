import {notify} from "@/utils/utils.js";
import {useOtherStore} from "@/store/module/other.js";
import {ref,reactive} from "vue";


export function otherHooks() {
    const otherStore = useOtherStore()
    const params = reactive({
        id: '',
        page: 1,
        size: 10,
        order: '',
        name: '',
        totalCount: '',
        pageCount: 1,
        classList: [],
        limit:10,
        imgData:{
            imgList: [],
            totalCount:'',
        }
    })
    const dialogVisible = ref()
    const type = ref()
    const formRef = ref()
    const init = () => {
        getGalleryList();
        
    }
    const getGalleryList = () => {
        otherStore.getGalleryList(params).then(res => {
            params.classList = res.list.slice().sort((a, b) => b.order - a.order);
            params.totalCount = res.totalCount
            params.pageCount = Math.ceil(res.totalCount / params.size);
            params.id = res.list[0].id
            console.log(params)
            getGalleryListByClass();
        })
    }
    const getGalleryListByClass =()=>{
        otherStore.getGalleryListByClass(params).then(res=>{
            console.log(res)
            params.imgData.imgList = res.list
            params.imgData.totalCount = res.totalCount
        })
    }

    const addGalleryClassClick = () => {
        dialogVisible.value = true
        type.value = 'add'
    }
    const delGalleryClassClick = (item) => {
        otherStore.deleteGalleryClass(item).then(() => {
            init()
            notify("删除成功")
        })

    }
    const updateGalleryClassClick = (item) => {
        dialogVisible.value = true
        type.value = 'update'
        params.name = item.name
        params.order = item.order
        params.id = item.id
    }
    const saveHandler = () => {
        switch (type) {
            case 'add': {
                otherStore.addGalleryClass(params).then(() => notify("添加成功")).finally(() => cancelHandler())
                break
            }
            case 'update': {
                otherStore.updateGalleryClass(params).then(() => notify("修改成功")).finally(() => cancelHandler())
                break
            }
        }
        init()
    }
    const cancelHandler = () => {
        dialogVisible.value = false
        params.name = ''
        params.order = ''
        params.id = ''
    }
    const backPage = () => {
        if (params.page > 1) {
            params.page -= 1;
            init();
        }
    };

    const nextPage = () => {
        if (params.page < params.pageCount) {
            params.page += 1;
            init();
        }
    };
    return {
        params, dialogVisible, formRef,
        init,
        addGalleryClassClick,
        delGalleryClassClick,
        updateGalleryClassClick,
        saveHandler,
        cancelHandler,
        backPage,
        nextPage,
    }
}