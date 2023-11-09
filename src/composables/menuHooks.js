import { ref, reactive } from "vue";

export function menuHooks() {
  const loading = ref(false);
  const resetPwdFormRef = ref();
  const resetPwdForm = reactive({
    oldPwd: "",
    newPwd: "",
    checkPwd: "",
  });
  const validatePassword = (rule, value, callback) => {
    if (value === "") {
      callback(new Error("请输入密码"));
    } else if (value !== resetPwdForm.newPwd) {
      callback(new Error("两次密码不一致"));
    } else {
      callback();
    }
  };
  const rules = reactive({
    oldPwd: [
      {
        type: "string",
        required: true,
        message: "请输入密码",
        trigger: "blur",
      },
    ],
    newPwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
    checkPwd: [
      { required: true, trigger: "blur", validator: validatePassword },
    ],
  });
  const closeDialog = () => {
    resetPwdForm.oldPwd = "";
    resetPwdForm.newPwd = "";
    resetPwdForm.checkPwd = "";
  };
  const refreshClick = () => {
    location.reload();
  };
  return {
    loading,
    resetPwdFormRef,
    resetPwdForm,
    rules,
    closeDialog,
    refreshClick,
  };
}
