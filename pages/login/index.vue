<template>
  <div class="flex h-full background">
    <v-container>
      <v-row class="h-full" align="center" justify="center">
        <!-- -------------------------------------------- left col -------------------------------------------- -->
        <v-col cols="6">
          <v-container fluid>
            <div
              class="flex flex-col content-center justify-center w-7/12 mx-auto"
            >
              <h2 class="text-7xl font-bold text-black text-left">
                {{ $t("paragraph.all.application_name") }}
              </h2>

              <p
                class="
                  text-sm
                  font-bold
                  text-black
                  capitalize
                  text-left
                  mt-3
                  ml-1
                "
              >
                {{ $t("paragraph.all.application_description") }}
              </p>
            </div>
          </v-container>
        </v-col>
        <!-- -------------------------------------------- left col -------------------------------------------- -->
        <!-- -------------------------------------------- right col -------------------------------------------- -->
        <v-col cols="6">
          <v-container fluid>
            <!-- -------------------------------- -->
            <div class="text-center">
              <h2 class="mt-6 text-3xl font-bold">
                {{ $t("paragraph.login.welcome") }}
              </h2>
              <p class="mt-2 text-sm text-gray-500">
                Please sign in to your account
              </p>
            </div>
            <!-- -------------------------------- -->
            <v-form class="px-7" v-model="isValid">
              <v-text-field
                v-model="signInForm.username"
                :error-messages="signInUsernameErrors"
                @input="$v.signInForm.username.$touch()"
                @blur="$v.signInForm.username.$touch()"
                :hint="$t('text_field.hint.login.username')"
                :label="$t('text_field.label.login.username')"
                class="mx-auto w-7/12"
                color="primary"
              ></v-text-field>

              <v-text-field
                v-model="signInForm.password"
                :error-messages="signInPasswordErrors"
                @input="$v.signInForm.password.$touch()"
                @blur="$v.signInForm.password.$touch()"
                :hint="$t('text_field.hint.login.password')"
                :label="$t('text_field.label.login.password')"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                counter
                class="mx-auto w-7/12"
              ></v-text-field>
              <!-- -------------------------------- -->
              <div class="flex justify-between items-center mx-auto w-7/12">
                <v-checkbox
                  v-model="isRememberMe"
                  :label="$t('checkbox.label.login.remember_me')"
                ></v-checkbox>
                <div class="text-sm">
                  <a href="#" class="text-indigo-400 hover:text-blue-500">
                    {{ $t("paragraph.login.forgot_password") }}
                  </a>
                </div>
              </div>
              <!-- -------------------------------- -->
              <div class="text-center mt-3">
                <v-btn
                  class="mx-auto w-7/12 rounded-lg"
                  @click="signIn"
                  :loading="isLoading"
                >
                  {{ $t("button.label.login.submit") }}
                </v-btn>
              </div>
              <!-- -------------------------------- -->
              <div class="text-center mt-5">
                <div class="text-red-500 text-sm">
                  {{ signInErrorMessage }}
                </div>
              </div>
              <!-- -------------------------------- -->
            </v-form>
          </v-container>
        </v-col>
        <!-- -------------------------------------------- right col -------------------------------------------- -->
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  layout: "empty",

  mixins: [validationMixin],

  validations: {
    signInForm: {
      username: { required },
      password: { required },
    },
  },

  data: () => ({
    signInForm: { username: "", password: "" },
    showPassword: false,
    isLoading: false,
    isValid: false,
    isRememberMe: false,
    signInErrorMessage: "",
  }),

  computed: {
    signInUsernameErrors() {
      const errors = [];
      if (!this.$v.signInForm.username.$dirty) return errors;
      !this.$v.signInForm.username.required &&
        errors.push(this.$t("notification.validate.require"));
      return errors;
    },

    signInPasswordErrors() {
      const errors = [];
      if (!this.$v.signInForm.password.$dirty) return errors;
      !this.$v.signInForm.password.required &&
        errors.push(this.$t("notification.validate.require"));
      return errors;
    },
  },

  methods: {
    async signIn() {
      this.isLoading = true;
      this.$v.signInForm.$touch();

      const vm = this;

      if (!this.$v.signInForm.$invalid) {
        try {
          let response = await this.$auth.loginWith("customStrategy", {
            data: {
              username: this.signInForm.username,
              password: this.signInForm.password,
            },
          });

          console.log(response.path);
        } catch (err) {
          if (err.response.data.message) {
            this.$toast.error(err.response.data.message);
            this.signInErrorMessage = err.response.data.message;
          } else {
            this.$toast.error(this.$t("notification.validate.has_error"));
          }
        }
      }

      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.background:before {
  background-image: linear-gradient(
      to right,
      rgb(0, 0, 0, 0.2) 20%,
      rgb(0, 0, 0, 0.4) 30%,
      rgb(0, 0, 0, 0.6) 40%,
      rgb(0, 0, 0, 0.8) 50%,
      rgba(0, 0, 0, 0.9) 60%,
      rgba(0, 0, 0, 0.95) 70%
    ),
    url("~/static/image/background/bg-02.jpg");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: brightness(1.1) blur(5px);
}

.background > * {
  position: relative;
  z-index: 1;
}
</style>
