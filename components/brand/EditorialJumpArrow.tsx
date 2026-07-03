import {
  EditorialReferenceMarker,
  type EditorialReferenceMarkerProps,
} from "./EditorialReferenceMarker";

type EditorialJumpArrowProps = EditorialReferenceMarkerProps;

export function EditorialJumpArrow({
  className,
  ...props
}: EditorialJumpArrowProps) {
  const classNames = ["editorial-jump-arrow", "editorial-reference-icon", className]
    .filter(Boolean)
    .join(" ");

  return <EditorialReferenceMarker className={classNames} {...props} />;
}
