import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allContentfulBlogPost.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Home" />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.title || node.slug
          return (
            <div key={node.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    node.description ||
                    node.content.childMarkdownRemark.excerpt,
                }}
              />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { fields: date, order: DESC }) {
      edges {
        node {
          content {
            childMarkdownRemark {
              excerpt
            }
          }
          date(formatString: "YYYY/MM/DD")
          description
          modifiedDate(formatString: "YYYY/MM/DD")
          slug
          title
        }
      }
    }
  }
`
