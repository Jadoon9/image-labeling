import { authApiService } from "./authService";

const forlderUploadMutation = authApiService.injectEndpoints({
  endpoints: (build) => ({
    addPojectFiles: build.mutation({
      query: (data) => {
        let formData = new FormData();
        formData.append("uploaded_file", data);
        return {
          url: "/unzip/",
          method: "POST",
          body: formData,
        };
      },
    }),
    getFolderList: build.query({
      query: () => {
        return {
          url: "/",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useAddPojectFilesMutation, useGettFolderList } =
  forlderUploadMutation;
export default forlderUploadMutation;
