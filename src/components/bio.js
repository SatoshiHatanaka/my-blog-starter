import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      contentfulAsset(file: { fileName: { regex: "/profile-pic.jpg/" } }) {
        fixed(height: 50, width: 50) {
          ...GatsbyContentfulFixed
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <Image
        fixed={data.contentfulAsset.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p style={{ marginTop: `auto`, marginBottom: `auto` }}>
        Written by
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>
          <strong>{author}</strong>
        </a>
      </p>
    </div>
  )
}

export default Bio
