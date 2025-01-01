import { annotate, annotationGroup } from "rough-notation";
import type { RoughAnnotation, RoughAnnotationType } from "./models";

const PASTEL_COLORS = [
  getComputedStyle(document.documentElement)
    .getPropertyValue("--purple-pastel")
    .trim(),
  getComputedStyle(document.documentElement)
    .getPropertyValue("--pink-pastel")
    .trim(),
  getComputedStyle(document.documentElement)
    .getPropertyValue("--yellow-pastel")
    .trim(),
  getComputedStyle(document.documentElement)
    .getPropertyValue("--blue-pastel")
    .trim(),
];

export function showAnnotations(
  nodes,
  annotationType: RoughAnnotationType,
  individualAnnotations?: RoughAnnotation[],
) {
  const annotationsId = crypto.randomUUID();

  nodes.forEach((node, index) => {
    Object.defineProperty(window, `span${annotationsId}${index + 1}`, {
      value: node,
      writable: false,
    });
  });

  const annotations = [];

  nodes.forEach((node, index) => {
    const randomColor =
      PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];
    const annotation = annotate(window[`span${annotationsId}${index + 1}`], {
      type: annotationType,
      color: randomColor,
      multiline: true,
    });
    annotations.push(annotation);
  });

  let annotationsGroupInstance;

  if (individualAnnotations && individualAnnotations.length > 0) {
    annotationsGroupInstance = annotationGroup([
      ...annotations,
      ...individualAnnotations,
    ]);
  } else {
    annotationsGroupInstance = annotationGroup(annotations);
  }
  annotationsGroupInstance.show();
}
