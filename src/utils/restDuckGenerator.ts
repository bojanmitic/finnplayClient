/* eslint-disable @typescript-eslint/no-unused-vars */
import { createEntityAdapter, createSlice, createAsyncThunk, EntityState, isAnyOf } from '@reduxjs/toolkit';

import * as Api from '../api';

// Please refer to https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk
// for more information about the typing of createAsyncThunk & other parts of RTK

// expect that the REST API returns "id" field for every entity
export interface BaseEntity {
  id: string | number;
}

// common properties for each REST resource root state
export interface BaseState {
  isFetchingOne: boolean;
  isFetchingMany: boolean;
  isUpdating: boolean;
  isUpdatingMany: boolean;
  isDeletingOne: boolean;
  isDeletingAll: boolean;
  isDeletingMany: boolean;
  isCreating: boolean;
  error: {
    isError: boolean;
    message: string;
  };
}

interface IWithIdParams {
  id: string | number;
  data: any;
  additionalId?: string | number; // Optional additional ID
}

export type RestState<T> = EntityState<T, any> & BaseState;

function createRestActions<T extends BaseEntity, K>(entityNamePlural: string) {
  return {
    get: createAsyncThunk<Array<T>, string | undefined>(`${entityNamePlural}/getAll`, async (queryParams) => {
      let query = '';
      if (queryParams !== undefined && queryParams !== '') {
        query = `?${queryParams}`;
      }
      return (await Api.get(`${entityNamePlural}${query}`)) as Array<T>;
    }),

    getAndReplace: createAsyncThunk<Array<T>, string | undefined>(
      `${entityNamePlural}/getAllAndReplace`,
      async (queryParams) => {
        let query = '';
        if (queryParams !== undefined && queryParams !== '') {
          query = `?${queryParams}`;
        }
        return (await Api.get(`${entityNamePlural}${query}`)) as Array<T>;
      }
    ),

    getWithIdAndReplace: createAsyncThunk<Array<T>, string | undefined>(
      `${entityNamePlural}/getAllAndReplace`,
      async (id) => {
        return (await Api.get(`${entityNamePlural}/${id}`)) as Array<T>;
      }
    ),

    getWithId: createAsyncThunk<Array<T>, string | undefined>(`${entityNamePlural}/getAllWithId`, async (id) => {
      return (await Api.get(`${entityNamePlural}/${id}`)) as Array<T>;
    }),

    getOne: createAsyncThunk<T, string | number>(
      `${entityNamePlural}/getOne`,
      async (id) => (await Api.get(`${entityNamePlural}/${id}`)) as T
    ),

    create: createAsyncThunk<T, K>(
      `${entityNamePlural}/create`,
      async (data) => (await Api.post(entityNamePlural, data)) as unknown as T
    ),

    createWithId: createAsyncThunk<T, IWithIdParams>(
      `${entityNamePlural}/create`,
      async ({ id, data }) => (await Api.post(`${entityNamePlural}/${id}`, data)) as unknown as T
    ),

    update: createAsyncThunk<T, T>(
      `${entityNamePlural}/update`,
      async (data) => (await Api.put(`${entityNamePlural}/${data.id || ''}`, data)) as T
    ),

    updateWithId: createAsyncThunk<T, IWithIdParams>(
      `${entityNamePlural}/update`,
      async ({ id, data, additionalId }) => {
        const url = additionalId ? `${entityNamePlural}/${additionalId}/${id}/` : `${entityNamePlural}/${id}`;
        return (await Api.put(url, data)) as T;
      }
    ),

    updateMany: createAsyncThunk<T[], unknown[]>(
      `${entityNamePlural}/updateMany`,
      async (data) => (await Api.put(`${entityNamePlural}`, data)) as T[]
    ),

    removeOne: createAsyncThunk<string | number, string | number>(`${entityNamePlural}/remove`, async (id) => {
      await Api.remove(`${entityNamePlural}/${id}`);
      return id;
    }),
    removeAll: createAsyncThunk<Array<T>, IWithIdParams>(`${entityNamePlural}/removeAll`, async ({ id, data }) => {
      return await Api.remove(`${entityNamePlural}/${id}`, data);
    }),
    removeMany: createAsyncThunk<Array<T>, IWithIdParams>(`${entityNamePlural}/removeMany`, async ({ id, data }) => {
      return await Api.remove(`${entityNamePlural}/${id}`, data);
    })
  };
}

export default function createRestDuck<T extends BaseEntity, K>(entityNamePlural: string) {
  const adapter = createEntityAdapter<T>();

  const initialState = adapter.getInitialState({
    isFetchingOne: false,
    isFetchingMany: false,
    isUpdating: false,
    isUpdatingMany: false,
    isDeletingOne: false,
    isDeletingAll: false,
    isDeletingMany: false,
    isCreating: false,
    error: {
      isError: false,
      message: ''
    }
  });

  const restActions = createRestActions<T, K>(entityNamePlural);

  const slice = createSlice({
    name: entityNamePlural,
    initialState: initialState as RestState<T>,
    reducers: {
      addOne: (state, action) => {
        adapter.upsertOne(state as RestState<T>, action.payload);
      },
      addMany: (state, action) => {
        adapter.upsertMany(state as RestState<T>, action.payload);
      },
      removeOneFromStore: (state, action) => {
        adapter.removeOne(state as RestState<T>, action.payload);
      }
    },
    extraReducers: (builder) => {
      builder.addCase(restActions.getOne.pending, (state, _) => {
        state.isFetchingOne = true;
        state.error.isError = false;
        state.error.message = '';
      });
      builder.addCase(restActions.getOne.fulfilled, (state, action) => {
        state.isFetchingOne = false;
        state.error.isError = false;
        state.error.message = '';
        // using only "state" here leads to TypeScript error
        adapter.upsertOne(state as RestState<T>, action.payload);
      });
      builder.addCase(restActions.getOne.rejected, (state, action) => {
        state.isFetchingOne = false;
        state.error.isError = true;
        state.error.message = action.error.message as string;
      });

      builder.addCase(restActions.updateMany.pending, (state, _) => {
        state.isUpdatingMany = true;
        state.error.isError = false;
        state.error.message = '';
      });
      builder.addCase(restActions.updateMany.fulfilled, (state, action) => {
        state.isUpdatingMany = false;
        state.error.isError = false;
        state.error.message = '';
        adapter.upsertMany(state as RestState<T>, action.payload);
      });
      builder.addCase(restActions.updateMany.rejected, (state, action) => {
        state.isUpdatingMany = false;
        state.error.isError = true;
        state.error.message = action.error.message as string;
      });

      builder.addCase(restActions.removeOne.pending, (state, _) => {
        state.isDeletingOne = true;
        state.error.isError = false;
        state.error.message = '';
      });
      builder.addCase(restActions.removeOne.fulfilled, (state, action) => {
        state.isDeletingOne = false;
        state.error.isError = false;
        state.error.message = '';
        adapter.removeOne(state as RestState<T>, action.payload);
      });
      builder.addCase(restActions.removeOne.rejected, (state, action) => {
        state.isDeletingOne = false;
        state.error.isError = true;
        state.error.message = action.error.message as string;
      });
      builder.addCase(restActions.removeAll.pending, (state, _) => {
        state.isDeletingAll = true;
        state.error.isError = false;
        state.error.message = '';
      });
      builder.addCase(restActions.removeAll.fulfilled, (state, _) => {
        state.isDeletingAll = false;
        state.error.isError = false;
        state.error.message = '';
        adapter.removeAll(state as RestState<T>);
      });
      builder.addCase(restActions.removeAll.rejected, (state, action) => {
        state.isDeletingAll = false;
        state.error.isError = true;
        state.error.message = action.error.message as string;
      });
      builder.addCase(restActions.removeMany.pending, (state, _) => {
        state.isDeletingMany = true;
        state.error.isError = false;
        state.error.message = '';
      });
      builder.addCase(restActions.removeMany.fulfilled, (state, action) => {
        const extractIds = action.payload.map((e) => e?.id || e) as string[];
        state.isDeletingMany = false;
        state.error.isError = false;
        state.error.message = '';
        adapter.removeMany(state as RestState<T>, extractIds);
      });
      builder.addCase(restActions.removeMany.rejected, (state, action) => {
        state.isDeletingMany = false;
        state.error.isError = true;
        state.error.message = action.error.message as string;
      });
      builder.addMatcher(isAnyOf(restActions.update.pending, restActions.updateWithId.pending), (state, _) => {
        state.isUpdating = true;
        state.error.isError = false;
        state.error.message = '';
      });
      builder.addMatcher(isAnyOf(restActions.update.fulfilled, restActions.updateWithId.fulfilled), (state, action) => {
        state.isUpdating = false;
        state.error.isError = false;
        state.error.message = '';
        adapter.upsertOne(state as RestState<T>, action.payload);
      });
      builder.addMatcher(isAnyOf(restActions.update.rejected, restActions.updateWithId.rejected), (state, action) => {
        state.isUpdating = false;
        state.error.isError = true;
        state.error.message = action.error.message as string;
      });
      builder.addMatcher(
        isAnyOf(restActions.getAndReplace.pending, restActions.getWithIdAndReplace.pending),
        (state, _) => {
          state.isFetchingMany = true;
          state.error.isError = false;
          state.error.message = '';
        }
      );
      builder.addMatcher(
        isAnyOf(restActions.getAndReplace.fulfilled, restActions.getWithIdAndReplace.fulfilled),
        (state, action) => {
          state.isFetchingMany = false;
          state.error.isError = false;
          state.error.message = '';
          adapter.setAll(state as RestState<T>, action.payload);
        }
      );
      builder.addMatcher(
        isAnyOf(restActions.getAndReplace.rejected, restActions.getWithIdAndReplace.rejected),
        (state, action) => {
          state.isFetchingMany = false;
          state.error.isError = true;
          state.error.message = action.error.message as string;
        }
      );
      builder.addMatcher(isAnyOf(restActions.create.pending, restActions.createWithId.pending), (state, _) => {
        state.isCreating = true;
        state.error.isError = false;
        state.error.message = '';
      });
      builder.addMatcher(isAnyOf(restActions.create.fulfilled, restActions.createWithId.fulfilled), (state, action) => {
        state.isCreating = false;
        state.error.isError = false;
        state.error.message = '';
        adapter.upsertOne(state as RestState<T>, action.payload);
      });
      builder.addMatcher(isAnyOf(restActions.create.rejected, restActions.createWithId.rejected), (state, action) => {
        state.isCreating = false;
        state.error.isError = true;
        state.error.message = action.error.message as string;
      });
      builder.addMatcher(isAnyOf(restActions.get.pending, restActions.getWithId.pending), (state, _) => {
        state.isFetchingMany = true;
        state.error.isError = false;
        state.error.message = '';
      });
      builder.addMatcher(isAnyOf(restActions.get.fulfilled, restActions.getWithId.fulfilled), (state, action) => {
        state.isFetchingMany = false;
        adapter.upsertMany(state as RestState<T>, action.payload);
        state.error.isError = false;
        state.error.message = '';
      });
      builder.addMatcher(isAnyOf(restActions.get.rejected, restActions.getWithId.rejected), (state, action) => {
        state.isFetchingMany = false;
        state.error.isError = true;
        state.error.message = action.error.message as string;
      });
    }
  });

  return {
    reducer: slice.reducer,
    adapter,
    actions: { ...slice.actions, ...restActions }
  };
}
