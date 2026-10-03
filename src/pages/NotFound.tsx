import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import Button from '../components/buttons/Button';

function NotFound() {
  return (
    <>
      <SEO title="Page not found" description="This page does not exist." />
      <Container className="py-24 text-center lg:py-32">
        <p className="font-mono text-sm font-semibold text-cova-accent">404</p>
        <h1 className="mt-4 text-display font-bold text-cova-text">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-base text-cova-muted">
          The page you requested does not exist or may have moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/" variant="primary">
            Back to home
          </Button>
          <Button to="/download" variant="secondary">
            Go to Download
          </Button>
        </div>
      </Container>
    </>
  );
}

export default NotFound;