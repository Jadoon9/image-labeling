import { authApiService } from "./authService";

const createProjectService = authApiService.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation({
      query: (data) => {
        return {
          url: "unzip/",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useCreateProjectMutation } = createProjectService;
export default createProjectService;
