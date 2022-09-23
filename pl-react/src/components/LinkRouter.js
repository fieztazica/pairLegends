import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

export default LinkRouter;
