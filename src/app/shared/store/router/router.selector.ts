import { AppStore } from '@models/store.model';
import * as fromRouter from '@ngrx/router-store';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectRouter = createFeatureSelector<AppStore, fromRouter.RouterReducerState<any>>('routerState');

export const selectParams = createSelector(selectRouter, state => state.state.params);