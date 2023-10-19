import { useEffect, useRef } from 'react';

 const useHorizontalScroll = () => {
    const elRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = elRef.current;

        if (el) {
            const onWheel = (e: WheelEvent) => {
                if (e.deltaY === 0) return;
                console.log('delta y', e.deltaY);

                if (
                    !(el.scrollLeft === 0 && e.deltaY < 0) &&
                    !(
                        el.scrollWidth - el.clientWidth - Math.round(el.scrollLeft) === 0 &&
                        e.deltaY > 0
                    )
                ) {
                    e.preventDefault();
                }

                el.scrollTo({
                    left: el.scrollLeft + e.deltaY,
                    behavior: 'smooth',
                });
            };

            el.addEventListener('wheel', onWheel);

            return () => el.removeEventListener('wheel', onWheel);
        }
    }, []);

    return elRef;
};
export default useHorizontalScroll;