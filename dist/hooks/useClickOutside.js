import { useEffect } from "react";
export default function useClickOutSide(ref, handler) {
    useEffect(function () {
        var listener = function (event) {
            var _a;
            if (!ref || ((_a = ref.current) === null || _a === void 0 ? void 0 : _a.contains(event.target))) {
                return;
            }
            handler(event);
        };
        document.addEventListener('click', listener);
        return function () {
            document.removeEventListener('click', listener);
        };
    }, [ref, handler]);
}
