import React, {useEffect, useRef, useState} from "react";

const JahiaCtx = React.createContext({});
const {Provider: JahiaCtxProvider, Consumer: JahiaCtxConsumer} = JahiaCtx;
export {JahiaCtx, JahiaCtxProvider, JahiaCtxConsumer};

const MainResourceCtx = React.createContext({});
const {Provider: MainResourceCtxProvider, Consumer: MainResourceCtxConsumer} = MainResourceCtx;
export {MainResourceCtx, MainResourceCtxProvider, MainResourceCtxConsumer};

