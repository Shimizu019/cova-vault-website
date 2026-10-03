import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import Button from '../components/buttons/Button';

function NotFound() {
  return (
    <>
      <SEO title="Page not found" description="This page does not exist." />
      <Container className="py-24 text-center">
        <h1 className="text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-cova-muted">The page you requested does not exist.</p>
        <div className="mt-6 flex justify-center">
          <Button to="/" variant="primary">Back to home</Button>
        </div>
      </Container>
    </>
  );
}

export default NotFound;
