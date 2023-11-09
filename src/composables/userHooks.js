import { reactive, ref } from "vue";

export function userHooks() {
  const loginFormRef = ref();
  const loginForm = reactive({
    userName: "",
    password: "",
  });
  const validateUserName = (rule, value, callback) => {
    if (value === "") {
      callback(new Error("请输入账号"));
    } else {
      if (loginForm.userName !== "") {
        if (!loginFormRef.value) return;
        loginFormRef.value.validateField("checkPass", () => null);
      }
      callback();
    }
  };
  const validatePassword = (rule, value, callback) => {
    if (value === "") {
      callback(new Error("请输入密码"));
    } else if (value !== loginForm.password) {
      callback(new Error("Two inputs don't match!"));
    } else {
      callback();
    }
  };
  const rules = reactive({
    userName: [{ validator: validateUserName, trigger: "blur" }],
    password: [{ validator: validatePassword, trigger: "blur" }],
  });
  return {
    loginFormRef,
    loginForm,
    rules,
  };
}
