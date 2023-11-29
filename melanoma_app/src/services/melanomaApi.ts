import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Lesion, { ILesion } from "@/models/lesion";
import { IPhoto } from "@/models/photo";
import { IReminder } from "@/models/reminder";
import User from "@/models/user";
import {
  ApiResponse,
  CompareResponse,
  DoctorAssociationRequest,
  PostLesionResponse,
  PostLoginResponse,
  PostUserResponse,
} from "@/types/melanomaApiTypes";

const baseUrl = process.env.EXPO_PUBLIC_MELANOMA_API_URL;

export const melanomaApi = createApi({
  reducerPath: "melanomaApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    mode: "cors",
  }),
  tagTypes: ["User", "Lesion", "Photo", "Reminder"],
  endpoints: (builder) => ({
    postUser: builder.mutation<PostUserResponse, Partial<User>>({
      query: (user) => ({
        url: "user",
        method: "post",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    patchUser: builder.mutation<ApiResponse, Partial<User>>({
      query: (user) => ({
        url: `user/${user.id}`,
        method: "patch",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<ApiResponse, number>({
      query: (userId) => ({
        url: `user/${userId}`,
        method: "delete",
      }),
      invalidatesTags: ["User"],
    }),
    postLogin: builder.query<PostLoginResponse, Partial<User>>({
      query: (user) => ({
        url: "user/login",
        method: "post",
        body: user,
      }),
    }),
    getUser: builder.query<User, number>({
      query: (userId) => `user/${userId}`,
      providesTags: ["User", "Lesion", "Reminder"],
      transformResponse: (data: User) => {
        const userLesions = (data.lesions ?? []).map((lesion) => {
          return {
            sharedWithUsers: [],
            userHasWriteNotesPermission: true,
            userIsOwner: true,
            ...lesion,
          };
        });
        const sharedLesions = (data.sharedLesions ?? []).map((lesion) => {
          return {
            sharedWithUsers: [],
            userHasWriteNotesPermission: false,
            userIsOwner: false,
            ...lesion,
          };
        });
        const lesions = [...userLesions, ...sharedLesions];
        return {
          ...data,
          lesions,
        };
      },
    }),
    postLesion: builder.mutation<PostLesionResponse, number>({
      query: (userId) => ({
        url: "lesion",
        method: "post",
        body: {
          name: "Lesión recien creada",
          owner: {
            id: userId,
          },
        },
      }),
      invalidatesTags: ["User"],
    }),
    deleteLesion: builder.mutation<ApiResponse, number>({
      query: (lesionId) => ({
        url: `lesion/${lesionId}`,
        method: "delete",
      }),
      invalidatesTags: ["Lesion", "User"],
    }),
    getLesion: builder.query<ILesion, number>({
      query: (lesionId) => `lesion/${lesionId}`,
      providesTags: ["Lesion"],
      // transformResponse: (lesion: ILesion) => {
      //   return new Lesion(lesion.id, lesion.name, lesion.photos, "Uknown", [], true);
      // },
    }),
    patchLesion: builder.mutation<ApiResponse, Partial<Lesion>>({
      query: (lesion) => ({
        url: `lesion/${lesion.id}`,
        method: "patch",
        body: lesion,
      }),
      invalidatesTags: ["Lesion"],
    }),
    postPhoto: builder.mutation<
      ApiResponse,
      { lesionId: number; photo: Partial<IPhoto> }
    >({
      query: ({ lesionId, photo }) => ({
        url: `lesion/${lesionId}/photo`,
        method: "post",
        body: photo,
      }),
      invalidatesTags: ["Lesion"],
    }),
    getPhoto: builder.query<IPhoto, number>({
      query: (photoId) => `/lesion/0/photo/${photoId}`,
      providesTags: ["Photo"],
    }),
    patchPhoto: builder.mutation<ApiResponse, Partial<IPhoto>>({
      query: (photo) => ({
        url: `lesion/0/photo/${photo.id}`,
        method: "patch",
        body: photo,
      }),
      invalidatesTags: ["Photo"],
    }),
    deletePhoto: builder.mutation<ApiResponse, number>({
      query: (photoId) => ({
        url: `lesion/0/photo/${photoId}`,
        method: "delete",
      }),
      invalidatesTags: ["Lesion"],
    }),
    postReminder: builder.mutation<
      ApiResponse,
      { idUser: number; idLesion: number; reminder: Partial<IReminder> }
    >({
      query: ({ idUser, idLesion, reminder }) => ({
        url: `user/${idUser}/reminder/${idLesion}`,
        method: "post",
        body: reminder,
      }),
      invalidatesTags: ["Reminder"],
    }),
    deleteReminder: builder.mutation<ApiResponse, number>({
      query: (idReminder) => ({
        url: `user/0/reminder/${idReminder}`,
        method: "delete",
      }),
      invalidatesTags: ["Reminder"],
    }),
    discardReminder: builder.mutation<ApiResponse, number>({
      query: (reminderId) => ({
        url: `user/0/reminder/${reminderId}/discard`,
        method: "post",
      }),
      invalidatesTags: ["Reminder"],
    }),
    postDoctorAssociation: builder.mutation<
      ApiResponse,
      DoctorAssociationRequest
    >({
      query: ({ userId, doctorUserName, lesionId }) => ({
        url: `user/${userId}/associate/${doctorUserName}/${lesionId}`,
        method: "post",
      }),
      invalidatesTags: ["Lesion"],
    }),
    deleteDoctorAssociation: builder.mutation<
      ApiResponse,
      DoctorAssociationRequest
    >({
      query: ({ userId, doctorUserName, lesionId }) => ({
        url: `user/${userId}/associate/${doctorUserName}/${lesionId}`,
        method: "delete",
      }),
      invalidatesTags: ["Lesion"],
    }),
    postCompare: builder.query<
      CompareResponse,
      { before: string; after: string }
    >({
      query: ({ before, after }) => ({
        url: "operation/analyze/compare",
        method: "post",
        body: {
          blobNames: [before, after],
        },
      }),
    }),
  }),
});

export const {
  usePostUserMutation,
  usePostLoginQuery,
  useLazyPostLoginQuery,
  useGetUserQuery,
  useDeleteLesionMutation,
  useGetLesionQuery,
  usePatchLesionMutation,
  useGetPhotoQuery,
  usePostPhotoMutation,
  useDeletePhotoMutation,
  usePatchPhotoMutation,
  useLazyGetUserQuery,
  usePostReminderMutation,
  useDeleteReminderMutation,
  usePostLesionMutation,
  usePatchUserMutation,
  useDeleteUserMutation,
  usePostDoctorAssociationMutation,
  useDeleteDoctorAssociationMutation,
  useDiscardReminderMutation,
  usePostCompareQuery,
} = melanomaApi;
