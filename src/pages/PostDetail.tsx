import { useParams } from "react-router-dom";

export default function PostDetail() {
  const { postId } = useParams();
  return <div>PostDetail {postId}</div>;
}
