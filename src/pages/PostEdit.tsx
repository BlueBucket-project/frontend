import { ReactElement } from "react";
import { useParams } from "react-router-dom";

export default function PostEdit(): ReactElement {
  const { postId } = useParams();
  return <div>PostEdit {postId}</div>;
}
