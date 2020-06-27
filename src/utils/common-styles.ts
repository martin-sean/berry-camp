import { createStyles } from "@material-ui/core";

// Common classes for styling
export default createStyles({
  centerBox: {
    position: 'relative',
  },
  centerContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  aspectBox: {
    width: '100%',
    paddingTop: '56.25%',
    position: 'relative',
  },
  aspectContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  noPadding: {
    padding: 0,
  },
});