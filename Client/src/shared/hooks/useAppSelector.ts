import { useSelector} from "react-redux";
import type {RootState} from "@/app/store/rootReducer.ts";

export const useAppSelector = useSelector.withTypes<RootState>();