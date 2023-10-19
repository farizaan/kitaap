import Card from "@/components/Card/Card";
import Slider from "@/components/Slider/Slider";

export default function HomePage() {
    return (
        <div>
            <Card/>
            <Slider popularBooks={[]}/>
        </div>
    );
}

export async function getServerSideProps() {
    return {
        props: {
            popular: [],
        },
    };
}
